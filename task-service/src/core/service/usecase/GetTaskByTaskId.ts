import { Code } from '@protaskify/shared/code/Code';
import { Exception } from '@protaskify/shared/exception/Exception';
import { CoreAssert } from '@protaskify/shared/util/assert/CoreAssert';
import { Task } from '../../domain/entity/Task';
import { TaskRepositoryPort } from '../../domain/port/persistence/TaskRepositoryPort';
import { GetTaskByTaskIdUseCase } from '../../domain/usecase/GetTaskByTaskIdUseCase';
import { GetTaskByTaskIdPort } from '../../domain/port/usecase/GetTaskByTaskIdPort';

export class GetTaskByTaskIdService implements GetTaskByTaskIdUseCase {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  public async execute(payload: GetTaskByTaskIdPort): Promise<Task> {
    const task: Task = await this.taskRepository.findTaskByTaskId(payload.id);
    const doesTaskExist = !!task;

    CoreAssert.throwIfFalse(
      doesTaskExist,
      Exception.new({
        code: Code.NOT_FOUND_ERROR,
        overrideMessage: 'task does not exist.',
      })
    );

    const doesUserOwnTask = !!(task.getCreatorId() === payload.userId);

    CoreAssert.throwIfFalse(
      doesUserOwnTask,
      Exception.new({
        code: Code.ACCESS_DENIED_ERROR,
      })
    );

    return task;
  }
}
