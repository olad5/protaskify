import { TaskDTO, UserDTO } from '../dto';
import { IDomainEvent } from '../events/DomainEvent';

export class TaskAssigned implements IDomainEvent {
  dateTimeOccurred: Date;
  task: TaskDTO;
  user: UserDTO;

  private constructor(task: TaskDTO, user: UserDTO) {
    this.dateTimeOccurred = new Date();
    this.task = task;
    this.user = user;
  }
  public static new(task: TaskDTO, user: UserDTO): TaskAssigned {
    return new TaskAssigned(task, user);
  }
}
