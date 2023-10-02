import { Module, Provider } from '@nestjs/common';
import { ProjectController, TaskController } from './app.controller';
import { ServiceAdapterModule } from '@protaskify/shared/adapters/service.module';
import { UserServiceAdapter } from '@protaskify/shared/adapters/user.adapter';
import { ScheduleModule } from '@nestjs/schedule';
import { NestHttpExceptionFilter } from '@protaskify/shared/api/exception-filter/NestHttpExceptionFilter';
import { APP_FILTER } from '@nestjs/core';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import knexConfig from '../infrastructure/adapter/persistence/knex/knexfile';
import { AppService } from './app.service';
import { ObjectionTaskRepositoryAdapter } from '../infrastructure/adapter/persistence/knex/repository/ObjectionTaskRepositoryAdapter';
import { TaskModel } from '../infrastructure/adapter/persistence/knex/models/task.model';
import { TaskRepositoryPort } from '../core/domain/port/persistence/TaskRepositoryPort';
import { CreateTaskService } from '../core/service/usecase/CreateTaskService';
import { GetTaskByTaskIdService } from '../core/service/usecase/GetTaskByTaskId';
import { TaskDITokens } from './di/TaskDITokens';
import { ProjectRepositoryPort } from '../core/domain/port/persistence/ProjectRepositoryPort';
import { SharedDITokens } from '@protaskify/shared/di/SharedDITokens';
import { RabbitMQModule } from '@protaskify/shared/infrastructure/adapter/message/rabbitmq/rabbitmq.module';
import { MessageQueue } from '@protaskify/shared/port/message/MessageQueue';
import { ProjectModel } from '../infrastructure/adapter/persistence/knex/models/project.model';
import { ObjectionProjectRepositoryAdapter } from '../infrastructure/adapter/persistence/knex/repository/ObjectionProjectRepositoryAdapter';
import { GetProjectByProjectIdService } from '../core/service/usecase/GetProjectByProjectIdService';
import { CreateProjectService } from '../core/service/usecase/CreateProjectService';
import { TaskUserModel } from '../infrastructure/adapter/persistence/knex/models/task_user.model';
import { AssignTaskService } from '../core/service/usecase/AssignTaskService';
import { NotifyUserTaskIsDueService } from '../core/service/usecase/NotifyUserTaskIsDueService';
import { GetTasksAssignedToUserService } from '../core/service/usecase/GetTasksAssignedToUserService';
import { GetTasksByProjectIdService } from '../core/service/usecase/GetTasksByProjectIdService';

const taskUseCaseProviders: Provider[] = [
  {
    provide: TaskDITokens.CreateTaskUseCase,
    useFactory: (
      taskRepository: TaskRepositoryPort,
      projectRepository: ProjectRepositoryPort
    ) => new CreateTaskService(taskRepository, projectRepository),
    inject: [TaskDITokens.TaskRepository, TaskDITokens.ProjectRepository],
  },
  {
    provide: TaskDITokens.GetTaskByTaskIdUseCase,
    useFactory: (taskRepository: TaskRepositoryPort) =>
      new GetTaskByTaskIdService(taskRepository),
    inject: [TaskDITokens.TaskRepository],
  },
  {
    provide: TaskDITokens.GetTasksAssignedToUserUseCase,
    useFactory: (taskRepository: TaskRepositoryPort) =>
      new GetTasksAssignedToUserService(taskRepository),
    inject: [TaskDITokens.TaskRepository],
  },
  {
    provide: TaskDITokens.GetTasksByProjectIdUseCase,
    useFactory: (
      taskRepository: TaskRepositoryPort,
      projectRepository: ProjectRepositoryPort
    ) => new GetTasksByProjectIdService(taskRepository, projectRepository),
    inject: [TaskDITokens.TaskRepository, TaskDITokens.ProjectRepository],
  },
  {
    provide: TaskDITokens.AssignTaskUseCase,
    useFactory: (
      taskRepository: TaskRepositoryPort,
      projectRepository: ProjectRepositoryPort,
      messageQueue: MessageQueue,
      userServiceAdapter: UserServiceAdapter
    ) =>
      new AssignTaskService(
        taskRepository,
        projectRepository,
        userServiceAdapter,
        messageQueue
      ),
    inject: [
      TaskDITokens.TaskRepository,
      TaskDITokens.ProjectRepository,
      SharedDITokens.MessageQueue,
      SharedDITokens.UserServiceAdapter,
    ],
  },
  {
    provide: TaskDITokens.CreateProjectUseCase,
    useFactory: (projectRepository: ProjectRepositoryPort) =>
      new CreateProjectService(projectRepository),
    inject: [TaskDITokens.ProjectRepository],
  },
  {
    provide: TaskDITokens.GetProjectByProjectIdUseCase,
    useFactory: (taskRepository: ProjectRepositoryPort) =>
      new GetProjectByProjectIdService(taskRepository),
    inject: [TaskDITokens.ProjectRepository],
  },
  {
    provide: TaskDITokens.NotifyUserTaskIsDueUseCase,
    useFactory: (
      taskRepository: TaskRepositoryPort,
      messageQueue: MessageQueue,
      userServiceAdapter: UserServiceAdapter
    ) =>
      new NotifyUserTaskIsDueService(
        taskRepository,
        userServiceAdapter,
        messageQueue
      ),
    inject: [
      TaskDITokens.TaskRepository,
      SharedDITokens.MessageQueue,
      SharedDITokens.UserServiceAdapter,
    ],
  },
];

const persistenceProviders: Provider[] = [
  {
    provide: TaskDITokens.TaskRepository,
    useFactory: (
      taskModel: typeof TaskModel,
      taskUserModel: typeof TaskUserModel
    ) => {
      const objectionTaskRepository = new ObjectionTaskRepositoryAdapter(
        taskModel,
        taskUserModel
      );
      return objectionTaskRepository;
    },
    inject: [TaskModel, TaskUserModel],
  },
  {
    provide: TaskDITokens.ProjectRepository,
    useFactory: (databaseService: typeof ProjectModel) => {
      const objectionTaskRepository = new ObjectionProjectRepositoryAdapter(
        databaseService
      );
      return objectionTaskRepository;
    },
    inject: [ProjectModel],
  },
];

@Module({
  controllers: [ProjectController, TaskController],
  imports: [
    ObjectionModule.forFeature([TaskModel, ProjectModel, TaskUserModel]),
    ObjectionModule.register({
      config: knexConfig,
    }),
    RabbitMQModule,
    ServiceAdapterModule,
    ScheduleModule.forRoot(),
  ],
  providers: [
    ...taskUseCaseProviders,
    ...persistenceProviders,
    AppService,
    {
      provide: APP_FILTER,
      useClass: NestHttpExceptionFilter,
    },
  ],
})
export class AppModule {}
