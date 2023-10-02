import { Task } from '../../domain/entity/Task';
import { TaskRepositoryPort } from '../../domain/port/persistence/TaskRepositoryPort';
import { CreateTaskUseCase } from '../../domain/usecase/CreateTaskUseCase';
import { CreateTaskPort } from '../../domain/port/usecase/CreateTaskPort';
import { ProjectRepositoryPort } from '../../domain/port/persistence/ProjectRepositoryPort';
import { CoreAssert } from '@protaskify/shared/util/assert/CoreAssert';
import { Exception } from '@protaskify/shared/exception/Exception';
import { Code } from '@protaskify/shared/code/Code';
import {
  ErrProjectDoesNotExist,
  ErrUserIsNotProjectCreator,
} from '../../domain/constants';

export class CreateTaskService implements CreateTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepositoryPort,
    private readonly projectRepository: ProjectRepositoryPort
  ) {}

  public async execute(payload: CreateTaskPort): Promise<Task> {
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

    const doesUserOwnProject = project.getCreatorId() === payload.creatorId;

    CoreAssert.throwIfFalse(
      doesUserOwnProject,
      Exception.new({
        code: Code.ACCESS_DENIED_ERROR,
        overrideMessage: ErrUserIsNotProjectCreator,
      })
    );

    const task: Task = await Task.new({
      title: payload.title,
      description: payload.description,
      dueDate: new Date(payload.dueDate),
      projectId: payload.projectId,
      creatorId: payload.creatorId,
    });

    await this.taskRepository.createTask(task);

    return task;
  }
}
