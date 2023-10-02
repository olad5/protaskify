import { Inject } from '@nestjs/common';
import { TaskModel } from '../models/task.model';
import { Task } from 'task-service/src/core/domain/entity/Task';
import { TaskRepositoryPort } from 'task-service/src/core/domain/port/persistence/TaskRepositoryPort';
import { ObjectionTaskMapper } from '../entity/mapper/ObjectionTaskMapper';
import { TaskUserModel } from '../models/task_user.model';
import { RedisClient } from '@protaskify/shared/infrastructure/adapter/cache/redis/redis.service';
import { TaskDTO } from '@protaskify/shared/dto';
import { RedisTaskMapper } from '../entity/mapper/RedisTaskMapper';

export class ObjectionTaskRepositoryAdapter implements TaskRepositoryPort {
  constructor(
    @Inject(TaskModel) private readonly taskModel: typeof TaskModel,
    @Inject(TaskUserModel) private readonly taskUserModel: typeof TaskUserModel,
    private readonly cache: RedisClient
  ) {}

  async createTask(task: Task): Promise<void> {
    await this.taskModel.query().insert({
      ...ObjectionTaskMapper.toPersistence(task),
    });
  }

  async findTasksPastDueDate(): Promise<{ task: Task; userIds: string[] }[]> {
    const result: { task: Task; userIds: string[] }[] = [];

    const dateNow = new Date();
    const limit = 10;
    const objectionTasks = await this.taskModel
      .query()
      .where('due_date', '>', dateNow)
      .limit(limit);

    for (let task of objectionTasks) {
      const userIds = [];
      const domainTask = ObjectionTaskMapper.toDomainEntity(task);
      const taskUserRecords = await this.taskUserModel
        .query()
        .where('task_id', domainTask.getId());
      for (let record of taskUserRecords) {
        userIds.push(record.assignee_id);
      }
      result.push({ task: domainTask, userIds });
    }

    return result;
  }

  async findTaskByTaskId(id: string): Promise<Task> {
    const cachedTask = await this.cache.getOne<TaskDTO>(id);
    if (cachedTask !== undefined) {
      return await RedisTaskMapper.toDomainEntity(cachedTask);
    }

    const objectionTask = await this.taskModel.query().findById(id);
    if (!objectionTask) {
      return undefined;
    }
    const task = ObjectionTaskMapper.toDomainEntity(objectionTask);

    await this.cache.set(task.getId(), task);
    return task;
  }

  async findTasksAssignedToUser(userId: string): Promise<Task[]> {
    const limit = 10;
    const objectionTasks = await this.taskUserModel
      .query()
      .where('assignee_id', userId)
      .limit(limit);
    const result: Task[] = [];
    for (let objectionTask of objectionTasks) {
      const task = await this.findTaskByTaskId(objectionTask.task_id);
      result.push(task);
    }

    return result;
  }

  async findTasksByProjectId(projectId: string): Promise<Task[]> {
    const limit = 10;
    const objectionTasks = await this.taskModel
      .query()
      .where('project_id', projectId)
      .limit(limit);

    const result: Task[] = [];
    for (let objectionTask of objectionTasks) {
      result.push(ObjectionTaskMapper.toDomainEntity(objectionTask));
    }

    return result;
  }

  async hasUserBeenAssignedTask(
    task: Task,
    assigneeId: string
  ): Promise<boolean> {
    const result = await this.taskUserModel.query().findOne({
      assignee_id: assigneeId,
      task_id: task.getId(),
    });

    return !!result;
  }

  async assignTaskToUser(task: Task, assigneeId: string): Promise<void> {
    await this.taskUserModel.knexQuery().insert({
      assignee_id: assigneeId,
      task_id: task.getId(),
    });
  }
}
