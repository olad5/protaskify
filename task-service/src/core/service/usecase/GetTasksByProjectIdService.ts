import { Exception } from '@protaskify/shared/exception/Exception';
import { Code } from '@protaskify/shared/code/Code';
import { CoreAssert } from '@protaskify/shared/util/assert/CoreAssert';
import { GetTasksByProjectIdUseCase } from '../../domain/usecase/GetTasksByProjectIdUseCase';
import { GetTasksByProjectIdPort } from '../../domain/port/usecase/GetTasksByProjectIdPort';
import { TaskRepositoryPort } from '../../domain/port/persistence/TaskRepositoryPort';
import { Task } from '../../domain/entity/Task';
import { ProjectRepositoryPort } from '../../domain/port/persistence/ProjectRepositoryPort';
import {
  ErrProjectDoesNotExist,
  ErrUserIsNotProjectCreator,
} from '../../domain/constants';

export class GetTasksByProjectIdService implements GetTasksByProjectIdUseCase {
  constructor(
    private readonly taskRepository: TaskRepositoryPort,
    private readonly projectRepository: ProjectRepositoryPort
  ) {}

  public async execute(payload: GetTasksByProjectIdPort): Promise<Task[]> {
    const project = await this.projectRepository.findProjectByProjectId(
      payload.projectId
    );
    const doesProjectExist = !!project;
    CoreAssert.throwIfFalse(
      doesProjectExist,
      Exception.new({
        code: Code.NOT_FOUND_ERROR,
        overrideMessage: ErrProjectDoesNotExist,
      })
    );

    const isUserCreatorOfProject = project.getCreatorId() === payload.userId;

    CoreAssert.throwIfFalse(
      isUserCreatorOfProject,
      Exception.new({
        code: Code.ACCESS_DENIED_ERROR,
        overrideMessage: ErrUserIsNotProjectCreator,
      })
    );
    const tasks = await this.taskRepository.findTasksByProjectId(
      payload.projectId
    );

    return tasks;
  }
}
