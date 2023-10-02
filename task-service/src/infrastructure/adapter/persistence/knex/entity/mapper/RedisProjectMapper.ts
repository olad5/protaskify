import { Project } from 'task-service/src/core/domain/entity/Project';
import { ProjectDTO } from '@protaskify/shared/dto';

export class RedisProjectMapper {
  public static async toDomainEntity(
    redisProject: ProjectDTO
  ): Promise<Project> {
    return await Project.new({
      id: redisProject.id,
      name: redisProject.name,
      description: redisProject.description,
      creatorId: redisProject.creatorId,
      createdAt: new Date(redisProject.createdAt),
      updatedAt: new Date(redisProject.updatedAt),
    });
  }
}
