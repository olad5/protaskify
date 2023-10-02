import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CoreApiResponse } from '@protaskify/shared/api/CoreApiResponse';
import { GetTaskByTaskIdUseCase } from '../core/domain/usecase/GetTaskByTaskIdUseCase';
import { ToTaskDTO } from '../core/domain/mapper/TaskDTOMapper';
import { GetTaskByTaskIdAdapter } from '../infrastructure/adapter/usecase/GetTaskByTaskIdAdapter';
import { CreateProjectUseCase } from '../core/domain/usecase/CreateProjectUseCase';
import { CreateProjectAdapter } from '../infrastructure/adapter/usecase/CreateProjectAdapter';
import { ToProjectDTO } from '../core/domain/mapper/ProjectDTOMapper';
import { CreateTaskAdapter } from '../infrastructure/adapter/usecase/CreateTaskAdapter';
import { CreateTaskUseCase } from '../core/domain/usecase/CreateTaskUseCase';
import { TaskDITokens } from './di/TaskDITokens';
import { GetProjectByProjectIdUseCase } from '../core/domain/usecase/GetProjectByProjectIdUseCase';
import { GetProjectByProjectIdAdapter } from '../infrastructure/adapter/usecase/GetProjectByProjectIdAdapter';
import { AssignTaskAdapter } from '../infrastructure/adapter/usecase/AssignTaskAdapter';
import { AssignTaskUseCase } from '../core/domain/usecase/AssignTaskUseCase';
import {
  HttpRestApiAssignTaskBody,
  HttpRestApiCreateProjectBody,
  HttpRestApiCreateTaskBody,
  ProjectDTO,
  TaskDTO,
} from '@protaskify/shared/dto';
import { GetTasksByProjectIdUseCase } from '../core/domain/usecase/GetTasksByProjectIdUseCase';
import { GetTasksAssignedToUserUseCase } from '../core/domain/usecase/GetTasksAssignedToUserUseCase';
import { GetTasksByProjectIdAdapter } from '../infrastructure/adapter/usecase/GetTasksByProjectIdAdapter';
import { GetTasksAssignedToUserAdapter } from '../infrastructure/adapter/usecase/GetTasksAssignedToUserAdapter';

function extractUserIdFromHeaders(req: Request): string {
  const userId = req.headers['x-userid'];
  return userId as string;
}

@Controller('tasks')
export class TaskController {
  constructor(
    @Inject(TaskDITokens.GetTaskByTaskIdUseCase)
    private readonly getTaskByTaskIdUseCase: GetTaskByTaskIdUseCase,
    @Inject(TaskDITokens.CreateTaskUseCase)
    private readonly createTaskUseCase: CreateTaskUseCase,
    @Inject(TaskDITokens.GetTasksAssignedToUserUseCase)
    private readonly getTasksAssignedToUserUseCase: GetTasksAssignedToUserUseCase
  ) {}

  @Post('')
  @HttpCode(HttpStatus.OK)
  public async createTask(
    @Req() req: Request,
    @Body() body: HttpRestApiCreateTaskBody
  ): Promise<CoreApiResponse<TaskDTO>> {
    const creatorId = extractUserIdFromHeaders(req);

    const adapter = await CreateTaskAdapter.new({
      title: body.title,
      description: body.description,
      dueDate: body.dueDate,
      projectId: body.projectId,
      creatorId,
    });
    const createdTask = await this.createTaskUseCase.execute(adapter);
    return CoreApiResponse.success<TaskDTO>(ToTaskDTO(createdTask));
  }

  @Get('/:taskId')
  @HttpCode(HttpStatus.OK)
  public async getTask(
    @Req() req: Request,
    @Param('taskId') taskId: string
  ): Promise<CoreApiResponse<TaskDTO>> {
    const userId = extractUserIdFromHeaders(req);
    const adapter: GetTaskByTaskIdAdapter = await GetTaskByTaskIdAdapter.new({
      id: taskId,
      userId,
    });

    const task = await this.getTaskByTaskIdUseCase.execute(adapter);

    return CoreApiResponse.success<TaskDTO>(ToTaskDTO(task));
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getTasksAssignedToUser(
    @Req() req: Request
  ): Promise<CoreApiResponse<TaskDTO[]>> {
    const userId = extractUserIdFromHeaders(req);
    const adapter = await GetTasksAssignedToUserAdapter.new({
      userId,
    });

    const tasks = await this.getTasksAssignedToUserUseCase.execute(adapter);
    const taskDtos: TaskDTO[] = [];
    for (let task of tasks) {
      taskDtos.push(ToTaskDTO(task));
    }

    return CoreApiResponse.success<TaskDTO[]>(taskDtos);
  }
}

@Controller('projects')
export class ProjectController {
  constructor(
    @Inject(TaskDITokens.CreateProjectUseCase)
    private readonly createProjectUseCase: CreateProjectUseCase,
    @Inject(TaskDITokens.GetProjectByProjectIdUseCase)
    private readonly getProjectByProjectIdUseCase: GetProjectByProjectIdUseCase,
    @Inject(TaskDITokens.AssignTaskUseCase)
    private readonly assignTaskUseCase: AssignTaskUseCase,
    @Inject(TaskDITokens.GetTasksByProjectIdUseCase)
    private readonly getTasksByProjectIdUseCase: GetTasksByProjectIdUseCase
  ) {}

  @Post('')
  @HttpCode(HttpStatus.OK)
  public async createProject(
    @Req() req: Request,
    @Body() body: HttpRestApiCreateProjectBody
  ): Promise<CoreApiResponse<ProjectDTO>> {
    const creatorId = extractUserIdFromHeaders(req);

    const adapter: CreateProjectAdapter = await CreateProjectAdapter.new({
      name: body.name,
      description: body.description,
      creatorId: creatorId,
    });

    const createdUser = await this.createProjectUseCase.execute(adapter);
    return CoreApiResponse.success<ProjectDTO>(ToProjectDTO(createdUser));
  }

  @Get('/:projectId')
  @HttpCode(HttpStatus.OK)
  public async getProject(
    @Param('projectId') projectId: string
  ): Promise<CoreApiResponse<ProjectDTO>> {
    GetTaskByTaskIdAdapter;

    const adapter = await GetProjectByProjectIdAdapter.new({
      id: projectId,
    });

    const project = await this.getProjectByProjectIdUseCase.execute(adapter);

    return CoreApiResponse.success<ProjectDTO>(ToProjectDTO(project));
  }

  @Get('/:projectId/tasks')
  @HttpCode(HttpStatus.OK)
  public async getTasksUnderAProject(
    @Req() req: Request,
    @Param('projectId') projectId: string
  ): Promise<
    CoreApiResponse<{
      projectId: string;
      tasks: TaskDTO[];
    }>
  > {
    const userId = extractUserIdFromHeaders(req);

    const adapter = await GetTasksByProjectIdAdapter.new({
      userId,
      projectId,
    });

    const tasks = await this.getTasksByProjectIdUseCase.execute(adapter);
    const taskDtos: TaskDTO[] = [];
    for (let task of tasks) {
      taskDtos.push(ToTaskDTO(task));
    }
    const response = {
      projectId,
      tasks: taskDtos,
    };

    return CoreApiResponse.success<{
      projectId: string;
      tasks: TaskDTO[];
    }>(response);
  }

  @Put('/:projectId/tasks/assignTask')
  @HttpCode(HttpStatus.OK)
  public async assignTask(
    @Req() req: Request,
    @Body() body: HttpRestApiAssignTaskBody,
    @Param('projectId') projectId: string
  ): Promise<CoreApiResponse<TaskDTO>> {
    const creatorId = extractUserIdFromHeaders(req);

    const adapter = await AssignTaskAdapter.new({
      assigneeId: body.assigneeId,
      taskId: body.taskId,
      creatorId: creatorId,
      projectId: projectId,
    });

    const assignTask = await this.assignTaskUseCase.execute(adapter);
    return CoreApiResponse.success<TaskDTO>(ToTaskDTO(assignTask));
  }
}
