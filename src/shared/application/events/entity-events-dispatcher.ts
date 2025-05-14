import { EventBus } from '@nestjs/cqrs'
import { EntityEventBase } from '@/shared/domain/entities/entity-event-base'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EntityEventsDispatcher {
  constructor(private readonly eventBus: EventBus) {}

  async dispatch(entity: EntityEventBase): Promise<void> {
    await Promise.all(entity.getEvents().map(e => this.eventBus.publish(e)))
    entity.clearEvents()
  }
}
