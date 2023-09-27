import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserServiceAdapter } from './user.service';

@Module({
  providers: [UserServiceAdapter],
  controllers: [UserController],
})
export class UserModule {}
