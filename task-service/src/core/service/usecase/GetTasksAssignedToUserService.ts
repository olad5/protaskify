import { GetTasksAssignedToUserPort } from '../../domain/port/usecase/GetTasksAssignedToUserPort';
import { TaskRepositoryPort } from '../../domain/port/persistence/TaskRepositoryPort';
import { Task } from '../../domain/entity/Task';
import { GetTasksAssignedToUserUseCase } from '../../domain/usecase/GetTasksAssignedToUserUseCase';

export class GetTasksAssignedToUserService
  implements GetTasksAssignedToUserUseCase
{
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  public async execute(payload: GetTasksAssignedToUserPort): Promise<Task[]> {
    const tasks = await this.taskRepository.findTasksAssignedToUser(
      payload.userId
    );

    return tasks;
  }
}
