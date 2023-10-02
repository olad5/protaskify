import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { NestHttpExceptionFilter } from '@protaskify/shared/api/exception-filter/NestHttpExceptionFilter';
import { APP_FILTER } from '@nestjs/core';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [UserModule, TaskModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: NestHttpExceptionFilter,
    },
  ],
})
export class AppModule {}
