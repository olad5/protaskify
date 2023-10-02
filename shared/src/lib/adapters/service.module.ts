import { Module } from '@nestjs/common';
import { SharedDITokens } from '@protaskify/shared/di/SharedDITokens';
import { UserServiceAdapter } from './user.adapter';

@Module({
  exports: [SharedDITokens.UserServiceAdapter],
  providers: [
    {
      provide: SharedDITokens.UserServiceAdapter,
      useFactory: () => new UserServiceAdapter(),
    },
  ],
})
export class ServiceAdapterModule {}
