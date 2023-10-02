import { Inject } from '@nestjs/common';
import { ProjectModel } from '../models/project.model';
import { ObjectionProjectMapper } from '../entity/mapper/ObjectionProjectMapper';
import { Project } from 'task-service/src/core/domain/entity/Project';
import { RedisClient } from '@protaskify/shared/infrastructure/adapter/cache/redis/redis.service';
import { ProjectRepositoryPort } from 'task-service/src/core/domain/port/persistence/ProjectRepositoryPort';
import { ProjectDTO } from '@protaskify/shared/dto';
import { RedisProjectMapper } from '../entity/mapper/RedisProjectMapper';

export class ObjectionProjectRepositoryAdapter
  implements ProjectRepositoryPort
{
  constructor(
    @Inject(ProjectModel) private readonly projectModel: typeof ProjectModel,
    private readonly cache: RedisClient
  ) {}

  async createProject(project: Project): Promise<void> {
    const objectionProject = ObjectionProjectMapper.toPersistence(project);
    await this.projectModel.query().insert({
      ...objectionProject,
    });
  }

  async findProjectByProjectId(id: string): Promise<Project> {
    const cachedProject = await this.cache.getOne<ProjectDTO>(id);
    if (cachedProject !== undefined) {
      return await RedisProjectMapper.toDomainEntity(cachedProject);
    }
    const objectionProject = await this.projectModel.query().findById(id);
    if (!objectionProject) {
      return undefined;
    }

    const project = ObjectionProjectMapper.toDomainEntity(objectionProject);
    await this.cache.set(project.getId(), project);

    return project;
  }
}
