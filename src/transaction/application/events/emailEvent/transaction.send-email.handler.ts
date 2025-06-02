import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { TransactionSendEmailEvent } from './transaction-send-email.event'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'

@EventsHandler(TransactionSendEmailEvent)
export class TransactionSendEmailHandler
  implements IEventHandler<TransactionSendEmailEvent>
{
  constructor(
    @InjectQueue('TransactionSendEmail')
    private readonly queue: Queue,
  ) {}

  async handle(event: TransactionSendEmailEvent): Promise<void> {
    await this.queue.add('transaction-send-email', event)
  }
}
