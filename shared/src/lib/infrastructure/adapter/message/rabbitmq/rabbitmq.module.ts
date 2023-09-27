import { Module } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQClient } from './rabbitmq.service';
import { SharedDITokens } from '@protaskify/shared/di/SharedDITokens';
import { ServerConfig } from '@protaskify/shared/infrastructure/config/ServerConfig';

const rabbitMQInstance = ClientsModule.register([
  {
    name: SharedDITokens.RabbitMQModule.toString(),
    transport: Transport.RMQ,
    options: {
      urls: [ServerConfig.RABBITMQ_HOST],
      queue: ServerConfig.RABBITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
  },
]);

@Module({
  imports: [rabbitMQInstance],
  exports: [SharedDITokens.MessageQueue],
  providers: [
    {
      provide: SharedDITokens.MessageQueue,
      useFactory: (client: ClientProxy) => new RabbitMQClient(client),
      inject: [SharedDITokens.RabbitMQModule.toString()],
    },
  ],
})
export class RabbitMQModule {}
