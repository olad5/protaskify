import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { ProjectServiceAdapter, TaskServiceAdapter } from './task.service';
import { CoreApiResponse } from '@protaskify/shared/api/CoreApiResponse';
import {
  HttpRestApiAssignTaskBody,
  HttpRestApiCreateProjectBody,
  HttpRestApiCreateTaskBody,
} from '@protaskify/shared/dto';
import { UserServiceAdapter } from '../user/user.service';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskServiceAdapter: TaskServiceAdapter,
    private readonly userServiceAdapter: UserServiceAdapter
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('')
  async createTask(
    @Req() request: Request,
    @Body(ValidationPipe) createTaskDto: HttpRestApiCreateTaskBody
  ) {
    const userAuthentication = await this.userServiceAdapter.authenticateUser(
      request
    );
    const userId = userAuthentication.data.id;

    const result = await this.taskServiceAdapter.createTask(
      createTaskDto,
      userId
    );
    return CoreApiResponse.success(result.data, result.message);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:taskId')
  async getTask(@Req() request: Request, @Param('taskId') taskId: string) {
    const userAuthentication = await this.userServiceAdapter.authenticateUser(
      request
    );
    const userId = userAuthentication.data.id;

    const result = await this.taskServiceAdapter.getTaskByTaskId(
      taskId,
      userId
    );
    return CoreApiResponse.success(result.data, result.message);
  }

  @HttpCode(HttpStatus.OK)
  @Get('')
  async getTasksAssignedToUser(@Req() request: Request) {
    const userAuthentication = await this.userServiceAdapter.authenticateUser(
      request
    );
    const userId = userAuthentication.data.id;

    const result = await this.taskServiceAdapter.getTasksAssignedToUser(userId);
    return CoreApiResponse.success(result.data, result.message);
  }
}

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectServiceAdapter: ProjectServiceAdapter,
    private readonly userServiceAdapter: UserServiceAdapter
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('')
  async createProject(
    @Req() request: Request,
    @Body(ValidationPipe)
    createProjectDto: Omit<HttpRestApiCreateProjectBody, 'creatorId'>
  ) {
    const userAuthentication = await this.userServiceAdapter.authenticateUser(
      request
    );
    const userId = userAuthentication.data.id;

    const result = await this.projectServiceAdapter.createProject({
      ...createProjectDto,
      creatorId: userId,
    });
    return CoreApiResponse.success(result.data, result.message);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:projectId')
  async getProject(
    @Req() request: Request,
    @Param('projectId') projectId: string
  ) {
    const userAuthentication = await this.userServiceAdapter.authenticateUser(
      request
    );
    const userId = userAuthentication.data.id;

    const result = await this.projectServiceAdapter.getProjectByProjectId(
      projectId,
      userId
    );
    return CoreApiResponse.success(result.data, result.message);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:projectId/tasks')
  async getTasksByProjectId(
    @Req() request: Request,
    @Param('projectId') projectId: string
  ) {
    const userAuthentication = await this.userServiceAdapter.authenticateUser(
      request
    );
    const userId = userAuthentication.data.id;

    const result = await this.projectServiceAdapter.getTasksByProjectId(
      projectId,
      userId
    );
    return CoreApiResponse.success(result.data, result.message);
  }

  @HttpCode(HttpStatus.OK)
  @Put('/:projectId/tasks/assignTask')
  async assignTask(
    @Req() request: Request,
    @Param('projectId') projectId: string,
    @Body(ValidationPipe) assignTaskDto: HttpRestApiAssignTaskBody
  ) {
    const userAuthentication = await this.userServiceAdapter.authenticateUser(
      request
    );
    const userId = userAuthentication.data.id;

    const result = await this.projectServiceAdapter.assignUserToTask(
      projectId,
      userId,
      assignTaskDto
    );
    return CoreApiResponse.success(result.data, result.message);
  }
}
