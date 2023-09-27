import { IDomainEvent } from '@protaskify/shared/events/DomainEvent';

export interface MessageQueue {
  sendEvent(pattern: string, event: IDomainEvent): Promise<void>;
}
