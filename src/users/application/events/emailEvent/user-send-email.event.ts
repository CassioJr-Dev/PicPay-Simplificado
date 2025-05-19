import { UserSendEmailDomainEvent } from '@/users/domain/events/user-send-email.domain-event'
import { IEvent } from '@nestjs/cqrs'

export class UserSendEmailEvent
  extends UserSendEmailDomainEvent
  implements IEvent {}
