import { TaskDTO } from '@protaskify/shared/dto';
import { Task } from '../entity/Task';

export function ToTaskDTO(task: Task): TaskDTO {
  return {
    id: task.getId(),
    title: task.getTitle(),
    description: task.getDescription(),
    dueDate: task.getDueDate().toISOString(),
    projectId: task.getProjectId(),
    creatorId: task.getCreatorId(),
    createdAt: task.getCreatedAt().toISOString(),
    updatedAt: task.getUpdatedAt().toISOString(),
  };
}
