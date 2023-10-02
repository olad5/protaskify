import { Exception } from '@protaskify/shared/exception/Exception';
import { Injectable } from '@nestjs/common';
import { CodeDescription } from '@protaskify/shared/code/Code';
import { CoreAssert } from '@protaskify/shared/util/assert/CoreAssert';
import {
  HttpRestApiCreateTaskBody,
  ResponseWithCommonData,
  DataWithMessage,
  TaskDTO,
  ProjectDTO,
  HttpRestApiCreateProjectBody,
  HttpRestApiAssignTaskBody,
  HttpRestApiGetTasksByProjectIdBody,
} from '@protaskify/shared/dto';
import ServiceAdapter from '@protaskify/shared/adapters/service.adapter';
import { ServerConfig } from '@protaskify/shared/infrastructure/config/ServerConfig';

@Injectable()
export class TaskServiceAdapter {
  client: ServiceAdapter;
  baseUrl: string;

  constructor() {
    this.baseUrl = ServerConfig.TASK_SERVICE_BASE_URL;
    this.client = new ServiceAdapter(this.baseUrl, {
      timeout: 20000,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
    });
  }

  public async createTask(
    createTaskDto: HttpRestApiCreateTaskBody,
    userId: string
  ): Promise<DataWithMessage<TaskDTO>> {
    const url = `${this.baseUrl}/tasks`;

    const headers = {
      'X-UserId': userId,
    };
    const response = await this.client.post<
      HttpRestApiCreateTaskBody,
      ResponseWithCommonData<TaskDTO>
    >(url, createTaskDto, headers);

    const statusFromAdapter = response.status;
    const code: CodeDescription = {
      code: response.code,
      message: response.message,
    };

    CoreAssert.throwIfFalse(
      statusFromAdapter,
      Exception.new({
        code: code,
        data: response.data,
        overrideMessage: response.message,
      })
    );

    const payload = {
      message: response.message,
      data: response.data,
    };

    return payload;
  }

  public async getTaskByTaskId(
    taskId: string,
    userId: string
  ): Promise<DataWithMessage<TaskDTO>> {
    const url = `${this.baseUrl}/tasks/${taskId}`;

    const headers = {
      'X-UserId': userId,
    };

    const response = await this.client.get<ResponseWithCommonData<TaskDTO>>(
      url,
      headers
    );

    const statusFromAdapter = response.status;
    const code: CodeDescription = {
      code: response.code,
      message: response.message,
    };

    CoreAssert.throwIfFalse(
      statusFromAdapter,
      Exception.new({
        code: code,
        data: response.data,
        overrideMessage: response.message,
      })
    );

    const payload = {
      message: response.message,
      data: response.data,
    };

    return payload;
  }

  public async getTasksAssignedToUser(
    userId: string
  ): Promise<DataWithMessage<TaskDTO>> {
    const url = `${this.baseUrl}/tasks/`;

    const headers = {
      'X-UserId': userId,
    };

    const response = await this.client.get<ResponseWithCommonData<TaskDTO>>(
      url,
      headers
    );

    const statusFromAdapter = response.status;
    const code: CodeDescription = {
      code: response.code,
      message: response.message,
    };

    CoreAssert.throwIfFalse(
      statusFromAdapter,
      Exception.new({
        code: code,
        data: response.data,
        overrideMessage: response.message,
      })
    );

    const payload = {
      message: response.message,
      data: response.data,
    };

    return payload;
  }
}

@Injectable()
export class ProjectServiceAdapter {
  client: ServiceAdapter;
  baseUrl: string;

  constructor() {
    this.baseUrl = ServerConfig.TASK_SERVICE_BASE_URL;
    this.client = new ServiceAdapter(this.baseUrl, {
      timeout: 20000,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
    });
  }

  public async createProject(
    createProjectDto: HttpRestApiCreateProjectBody
  ): Promise<DataWithMessage<ProjectDTO>> {
    const url = `${this.baseUrl}/projects`;
    const headers = {
      'X-UserId': createProjectDto.creatorId,
    };

    const response = await this.client.post<
      HttpRestApiCreateProjectBody,
      ResponseWithCommonData<ProjectDTO>
    >(url, createProjectDto, headers);

    const statusFromAdapter = response.status;
    const code: CodeDescription = {
      code: response.code,
      message: response.message,
    };

    CoreAssert.throwIfFalse(
      statusFromAdapter,
      Exception.new({
        code: code,
        data: response.data,
        overrideMessage: response.message,
      })
    );

    const payload = {
      message: response.message,
      data: response.data,
    };

    return payload;
  }

  public async getProjectByProjectId(
    projectId: string,
    userId: string
  ): Promise<DataWithMessage<ProjectDTO>> {
    const url = `${this.baseUrl}/projects/${projectId}`;
    const headers = {
      'X-UserId': userId,
    };
    const response = await this.client.get<ResponseWithCommonData<ProjectDTO>>(
      url,
      headers
    );

    const statusFromAdapter = response.status;
    const code: CodeDescription = {
      code: response.code,
      message: response.message,
    };

    CoreAssert.throwIfFalse(
      statusFromAdapter,
      Exception.new({
        code: code,
        data: response.data,
        overrideMessage: response.message,
      })
    );

    const payload = {
      message: response.message,
      data: response.data,
    };

    return payload;
  }

  public async assignUserToTask(
    projectId: string,
    userId: string,
    assignTaskDto: HttpRestApiAssignTaskBody
  ): Promise<DataWithMessage<TaskDTO>> {
    const url = `${this.baseUrl}/projects/${projectId}/tasks/assignTask`;
    const headers = {
      'X-UserId': userId,
    };
    const response = await this.client.put<
      HttpRestApiAssignTaskBody,
      ResponseWithCommonData<TaskDTO>
    >(url, assignTaskDto, headers);

    const statusFromAdapter = response.status;
    const code: CodeDescription = {
      code: response.code,
      message: response.message,
    };

    CoreAssert.throwIfFalse(
      statusFromAdapter,
      Exception.new({
        code: code,
        data: response.data,
        overrideMessage: response.message,
      })
    );

    const payload = {
      message: response.message,
      data: response.data,
    };

    return payload;
  }

  public async getTasksByProjectId(
    projectId: string,
    userId: string
  ): Promise<DataWithMessage<HttpRestApiGetTasksByProjectIdBody>> {
    const url = `${this.baseUrl}/projects/${projectId}/tasks`;

    const headers = {
      'X-UserId': userId,
    };

    const response = await this.client.get<
      ResponseWithCommonData<HttpRestApiGetTasksByProjectIdBody>
    >(url, headers);

    const statusFromAdapter = response.status;
    const code: CodeDescription = {
      code: response.code,
      message: response.message,
    };

    CoreAssert.throwIfFalse(
      statusFromAdapter,
      Exception.new({
        code: code,
        data: response.data,
        overrideMessage: response.message,
      })
    );

    const payload = {
      message: response.message,
      data: response.data,
    };

    return payload;
  }
}
