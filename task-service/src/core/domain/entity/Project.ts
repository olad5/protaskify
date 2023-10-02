import { IsDate, IsString, IsUUID } from 'class-validator';
import { v4 } from 'uuid';
import { CreateProjectEntityPayload } from './type/CreateProjectEntityPayload';
import { Entity } from '@protaskify/shared/entity/Entity';

export class Project extends Entity<string> {
  @IsString()
  private name: string;

  @IsString()
  private description: string;

  @IsUUID()
  private creatorId: string;

  @IsDate()
  private readonly createdAt: Date;

  @IsDate()
  private readonly updatedAt: Date;

  constructor(payload: CreateProjectEntityPayload) {
    super();

    this.description = payload.description;
    this.name = payload.name;
    this.creatorId = payload.creatorId;
    this.id = payload.id || v4();
    this.createdAt = payload.createdAt || new Date();
    this.updatedAt = payload.updatedAt || new Date();
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getCreatorId(): string {
    return this.creatorId;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public static async new(
    payload: CreateProjectEntityPayload
  ): Promise<Project> {
    const project: Project = new Project(payload);
    await project.validate();

    return project;
  }
}
