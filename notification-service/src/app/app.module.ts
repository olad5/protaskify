import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StubEmailService } from './app.service';
import { NotificaitionDITokens } from './di/NotificationDITokens';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: NotificaitionDITokens.EmailService,
      useFactory: () => new StubEmailService(),
    },
  ],
})
export class AppModule {}
