import { ServerConfig } from '@protaskify/shared/infrastructure/config/ServerConfig';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [ServerConfig.RABBITMQ_HOST],
        queue: ServerConfig.RABBITMQ_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    }
  );
  await app.listen();
  Logger.log(`🚀 Notification Service Application is running`);
}

bootstrap();
