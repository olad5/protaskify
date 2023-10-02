import { IsDate, IsString, IsUUID } from 'class-validator';
import { v4 } from 'uuid';
import { CreateTaskEntityPayload } from './type/CreateTaskEntityPayload';
import { Entity } from '@protaskify/shared/entity/Entity';

export class Task extends Entity<string> {
  @IsString()
  private title: string;

  @IsString()
  private description: string;

  @IsDate()
  private readonly dueDate: Date;

  @IsUUID()
  private projectId: string;

  @IsUUID()
  private creatorId: string;

  @IsDate()
  private readonly createdAt: Date;

  @IsDate()
  private readonly updatedAt: Date;

  constructor(payload: CreateTaskEntityPayload) {
    super();

    this.description = payload.description;
    this.title = payload.title;
    this.dueDate = payload.dueDate;
    this.projectId = payload.projectId;
    this.creatorId = payload.creatorId;
    this.id = payload.id || v4();
    this.createdAt = payload.createdAt || new Date();
    this.updatedAt = payload.updatedAt || new Date();
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getProjectId(): string {
    return this.projectId;
  }

  public getCreatorId(): string {
    return this.creatorId;
  }

  public getDueDate(): Date {
    return this.dueDate;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public static async new(payload: CreateTaskEntityPayload): Promise<Task> {
    const task: Task = new Task(payload);
    await task.validate();

    return task;
  }
}
