import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SharedDITokens } from '@protaskify/shared/di/SharedDITokens';
import { IDomainEvent } from '@protaskify/shared/events/DomainEvent';
import { MessageQueue } from '@protaskify/shared/port/message/MessageQueue';

@Injectable()
export class RabbitMQClient implements MessageQueue, OnApplicationBootstrap {
  constructor(
    @Inject(SharedDITokens.RabbitMQModule) private readonly client: ClientProxy
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  public async sendEvent(pattern: string, event: IDomainEvent): Promise<void> {
    this.client.emit(pattern, event);
  }
}
