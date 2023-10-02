import { Optional } from '@protaskify/shared/type/CommonTypes';
import { Task } from '../../entity/Task';

export interface TaskRepositoryPort {
  findTaskByTaskId(taskId: string): Promise<Optional<Task>>;
  findTasksPastDueDate(): Promise<{ task: Task; userIds: string[] }[]>;
  findTasksAssignedToUser(userId: string): Promise<Task[]>;
  findTasksByProjectId(projectId: string): Promise<Task[]>;
  createTask(task: Task): Promise<void>;
  assignTaskToUser(task: Task, assigneeId: string): Promise<void>;
  hasUserBeenAssignedTask(task: Task, assigneeId: string): Promise<boolean>;
}
