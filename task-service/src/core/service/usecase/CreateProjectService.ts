import { Project } from '../../domain/entity/Project';
import { ProjectRepositoryPort } from '../../domain/port/persistence/ProjectRepositoryPort';
import { CreateProjectUseCase } from '../../domain/usecase/CreateProjectUseCase';
import { CreateProjectPort } from '../../domain/port/usecase/CreateProjectPort';

export class CreateProjectService implements CreateProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepositoryPort) {}

  public async execute(payload: CreateProjectPort): Promise<Project> {
    const project: Project = await Project.new({
      name: payload.name,
      description: payload.description,
      creatorId: payload.creatorId,
    });

    await this.projectRepository.createProject(project);

    return project;
  }
}
