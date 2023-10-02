import { Task } from 'task-service/src/core/domain/entity/Task';
import { ObjectionTask, TaskModel } from '../../models/task.model';

export class ObjectionTaskMapper {
  public static toPersistence(domainTask: Task): ObjectionTask {
    const objectionTask: ObjectionTask = {
      id: domainTask.getId(),
      title: domainTask.getTitle(),
      description: domainTask.getDescription(),
      due_date: domainTask.getDueDate(),
      project_id: domainTask.getProjectId(),
      creator_id: domainTask.getCreatorId(),
      created_at: domainTask.getCreatedAt(),
      updated_at: domainTask.getUpdatedAt(),
    };
    return objectionTask;
  }

  public static toDomainEntity(objectionTask: TaskModel): Task {
    const domainTask: Task = new Task({
      id: objectionTask.id,
      title: objectionTask.title,
      description: objectionTask.description,
      dueDate: objectionTask.due_date,
      projectId: objectionTask.project_id,
      creatorId: objectionTask.creator_id,
      createdAt: objectionTask.created_at,
      updatedAt: objectionTask.updated_at,
    });

    return domainTask;
  }
}
