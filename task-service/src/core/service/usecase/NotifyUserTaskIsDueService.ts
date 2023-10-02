import { MessageQueue } from '@protaskify/shared/port/message/MessageQueue';
import { TaskDueDatePassed } from '@protaskify/shared/events/TaskDueDatePassed';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserServiceAdapter } from '@protaskify/shared/adapters/user.adapter';
import { TaskDTO, UserDTO } from '@protaskify/shared/dto/';
import { TaskRepositoryPort } from '../../domain/port/persistence/TaskRepositoryPort';
import { NotifyUserTaskIsDueUseCase } from '../../domain/usecase/NotifyUserTaskIsDueUseCase';
import { IDomainEvent } from '@protaskify/shared/events/DomainEvent';
import { ToTaskDTO } from '../../domain/mapper/TaskDTOMapper';

export class NotifyUserTaskIsDueService
  implements NotifyUserTaskIsDueUseCase<unknown>
{
  constructor(
    private readonly taskRepository: TaskRepositoryPort,
    private readonly userServiceAdapter: UserServiceAdapter,
    private readonly messageQueue: MessageQueue
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  public async execute(): Promise<void> {
    const tasksWithAssigneeIds =
      await this.taskRepository.findTasksPastDueDate();

    for (const taskWithAssignees of tasksWithAssigneeIds) {
      for (const userId of taskWithAssignees.userIds) {
        let userServiceAdapterResponse =
          await this.userServiceAdapter.getUserbyUserId(userId);
        if (userServiceAdapterResponse.status === false) {
          continue;
        }
        let user: UserDTO = userServiceAdapterResponse.data;
        let task: TaskDTO = ToTaskDTO(taskWithAssignees.task);
        const event: IDomainEvent = TaskDueDatePassed.new(task, user);
        await this.messageQueue.sendEvent(TaskDueDatePassed.name, event);
      }
    }
  }
}
