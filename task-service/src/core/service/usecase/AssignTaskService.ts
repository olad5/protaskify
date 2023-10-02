import { UserServiceAdapter } from '@protaskify/shared/adapters/user.adapter';
import { SharedDITokens } from '@protaskify/shared/di/SharedDITokens';
import { TaskAssigned } from '@protaskify/shared/events/TaskAssigned';
import { MessageQueue } from '@protaskify/shared/port/message/MessageQueue';
import { Code } from '@protaskify/shared/code/Code';
import { Exception } from '@protaskify/shared/exception/Exception';
import { CoreAssert } from '@protaskify/shared/util/assert/CoreAssert';
import { AssignTaskUseCase } from '../../domain/usecase/AssignTaskUseCase';
import { AssignTaskPort } from '../../domain/port/usecase/AssignTaskPort';
import { Task } from '../../domain/entity/Task';
import { TaskRepositoryPort } from '../../domain/port/persistence/TaskRepositoryPort';
import {
  ErrProjectDoesNotExist,
  ErrTaskDoesNotExist,
} from '../../domain/constants';
import { ProjectRepositoryPort } from '../../domain/port/persistence/ProjectRepositoryPort';
import { TaskDTO, UserDTO } from '@protaskify/shared/dto/';
import { ToTaskDTO } from '../../domain/mapper/TaskDTOMapper';
import { IDomainEvent } from '@protaskify/shared/events/DomainEvent';
import { Inject } from '@nestjs/common';

export class AssignTaskService implements AssignTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepositoryPort,
    private readonly projectRepository: ProjectRepositoryPort,
    private readonly userServiceAdapter: UserServiceAdapter,
    @Inject(SharedDITokens.MessageQueue)
    private readonly messageQueue: MessageQueue
  ) {}

  public async execute(payload: AssignTaskPort): Promise<Task> {
    const project = await this.projectRepository.findProjectByProjectId(
      payload.projectId
    );

    CoreAssert.throwIfFalse(
      !!project,
      Exception.new({
        code: Code.NOT_FOUND_ERROR,
        overrideMessage: ErrProjectDoesNotExist,
      })
    );

    const existingTask = await this.taskRepository.findTaskByTaskId(
      payload.taskId
    );
    const doesProjectExist = !!existingTask;

    CoreAssert.throwIfFalse(
      doesProjectExist,
      Exception.new({
        code: Code.NOT_FOUND_ERROR,
        overrideMessage: ErrTaskDoesNotExist,
      })
    );

    const doesUserOwnProject = project.getCreatorId() === payload.creatorId;
    CoreAssert.throwIfFalse(
      doesUserOwnProject,
      Exception.new({
        code: Code.ACCESS_DENIED_ERROR,
      })
    );

    let userServiceAdapterResponse =
      await this.userServiceAdapter.getUserbyUserId(payload.assigneeId);

    CoreAssert.throwIfFalse(
      userServiceAdapterResponse.status,
      Exception.new({
        code: Code.NOT_FOUND_ERROR,
        overrideMessage: 'assignee does not exist',
      })
    );

    const hasUserBeenAssignedTask =
      await this.taskRepository.hasUserBeenAssignedTask(
        existingTask,
        payload.assigneeId
      );

    if (hasUserBeenAssignedTask == false) {
      await this.taskRepository.assignTaskToUser(
        existingTask,
        payload.assigneeId
      );
    }

    let user: UserDTO = userServiceAdapterResponse.data;
    let task: TaskDTO = ToTaskDTO(existingTask);
    const event: IDomainEvent = TaskAssigned.new(task, user);
    await this.messageQueue.sendEvent(TaskAssigned.name, event);
    return existingTask;
  }
}
