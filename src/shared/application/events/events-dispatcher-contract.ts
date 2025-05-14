import { EntityEventBase } from '@/shared/domain/entities/entity-event-base'

export interface IEntityEventsDispatcher {
  dispatch(entity: EntityEventBase): Promise<void>
}
