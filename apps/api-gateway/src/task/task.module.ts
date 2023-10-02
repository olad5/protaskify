import { Module } from '@nestjs/common';
import { ProjectController, TaskController } from './task.controller';
import { ProjectServiceAdapter, TaskServiceAdapter } from './task.service';
import { UserServiceAdapter } from '../user/user.service';

@Module({
  providers: [TaskServiceAdapter, UserServiceAdapter, ProjectServiceAdapter],
  controllers: [TaskController, ProjectController],
})
export class TaskModule {}
