import { Task } from 'task-service/src/core/domain/entity/Task';
import { TaskDTO } from '@protaskify/shared/dto';

export class RedisTaskMapper {
  public static async toDomainEntity(redisTask: TaskDTO): Promise<Task> {
    return await Task.new({
      id: redisTask.id,
      title: redisTask.title,
      description: redisTask.description,
      projectId: redisTask.projectId,
      creatorId: redisTask.creatorId,
      dueDate: new Date(redisTask.dueDate),
      createdAt: new Date(redisTask.createdAt),
      updatedAt: new Date(redisTask.updatedAt),
    });
  }
}
