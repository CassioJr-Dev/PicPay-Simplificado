import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { UserSendEmailEvent } from './user-send-email.event'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'

@EventsHandler(UserSendEmailEvent)
export class UserAssigned_SendEmailHandler
  implements IEventHandler<UserSendEmailEvent>
{
  constructor(
    @InjectQueue('UserSendEmail')
    private readonly queue: Queue,
  ) {}

  async handle(event: UserSendEmailEvent): Promise<void> {
    await this.queue.add('user-send-email', event)
  }
}
