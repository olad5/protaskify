import { Code } from '@protaskify/shared/code/Code';
import { Exception } from '@protaskify/shared/exception/Exception';
import { CoreAssert } from '@protaskify/shared/util/assert/CoreAssert';
import { Project } from '../../domain/entity/Project';
import { ProjectRepositoryPort } from '../../domain/port/persistence/ProjectRepositoryPort';
import { GetProjectByProjectIdUseCase } from '../../domain/usecase/GetProjectByProjectIdUseCase';
import { GetProjectByProjectIdPort } from '../../domain/port/usecase/GetProjectByProjectIdPort';
import { ErrProjectDoesNotExist } from '../../domain/constants';

export class GetProjectByProjectIdService
  implements GetProjectByProjectIdUseCase
{
  constructor(private readonly taskRepository: ProjectRepositoryPort) {}

  public async execute(payload: GetProjectByProjectIdPort): Promise<Project> {
    const project: Project = await this.taskRepository.findProjectByProjectId(
      payload.id
    );
    const doesProjectExist = !!project;

    CoreAssert.throwIfFalse(
      doesProjectExist,
      Exception.new({
        code: Code.NOT_FOUND_ERROR,
        overrideMessage: ErrProjectDoesNotExist,
      })
    );

    return project;
  }
}
