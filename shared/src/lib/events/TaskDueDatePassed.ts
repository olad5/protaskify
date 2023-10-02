import { TaskDTO, UserDTO } from '../dto';
import { IDomainEvent } from '../events/DomainEvent';

export class TaskDueDatePassed implements IDomainEvent {
  dateTimeOccurred: Date;
  task: TaskDTO;
  user: UserDTO;

  private constructor(task: TaskDTO, user: UserDTO) {
    this.dateTimeOccurred = new Date();
    this.task = task;
    this.user = user;
  }
  public static new(task: TaskDTO, user: UserDTO): TaskDueDatePassed {
    return new TaskDueDatePassed(task, user);
  }
}
