import { TaskDueDatePassed } from '@protaskify/shared/events/TaskDueDatePassed';
import { TaskAssigned } from '@protaskify/shared/events/TaskAssigned';
import { Controller, Inject } from '@nestjs/common';
import { EmailService, IMail } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { TaskDTO, UserDTO } from '@protaskify/shared/dto';
import { NotificaitionDITokens } from './di/NotificationDITokens';
import {
  taskAssignedTemplate,
  taskPassDueDateTemplate,
} from '../assets/email.template';

@Controller()
export class AppController {
  constructor(
    @Inject(NotificaitionDITokens.EmailService)
    private readonly emailService: EmailService
  ) {}

  @EventPattern(TaskAssigned.name)
  async handleTaskAssignedToUser(data: { task: TaskDTO; user: UserDTO }) {
    const user = data.user;
    const task = data.task;
    const name = user.firstName;
    const email = user.email;
    const subject = 'Task Assigned';

    const body = taskAssignedTemplate(task, user);
    const mail: IMail = {
      to: {
        email,
        name,
      },
      subject: subject,
      body: body,
    };

    await this.emailService.sendEmail(mail);
  }

  @EventPattern(TaskDueDatePassed.name)
  async handleTaskDueDatePassed(data: { task: TaskDTO; user: UserDTO }) {
    const user = data.user;
    const task = data.task;
    const name = user.firstName;
    const email = user.email;
    const subject = 'Task is Due';

    const body = taskPassDueDateTemplate(task, user);
    const mail: IMail = {
      to: {
        email,
        name,
      },
      subject: subject,
      body: body,
    };

    await this.emailService.sendEmail(mail);
  }
}
