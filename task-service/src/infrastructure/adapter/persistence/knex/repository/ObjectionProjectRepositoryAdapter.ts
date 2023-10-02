import { Inject } from '@nestjs/common';
import { ProjectModel } from '../models/project.model';
import { ObjectionProjectMapper } from '../entity/mapper/ObjectionProjectMapper';
import { Project } from 'task-service/src/core/domain/entity/Project';
import { ProjectRepositoryPort } from 'task-service/src/core/domain/port/persistence/ProjectRepositoryPort';

export class ObjectionProjectRepositoryAdapter
  implements ProjectRepositoryPort
{
  constructor(
    @Inject(ProjectModel) private readonly projectModel: typeof ProjectModel
  ) {}

  async createProject(project: Project): Promise<void> {
    const objectionProject = ObjectionProjectMapper.toPersistence(project);
    await this.projectModel.query().insert({
      ...objectionProject,
    });
  }

  async findProjectByProjectId(id: string): Promise<Project> {
    const objectionProject = await this.projectModel.query().findById(id);

    return objectionProject
      ? ObjectionProjectMapper.toDomainEntity(objectionProject)
      : undefined;
  }
}
