import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { TransactionSendEmailDto } from './transaction-sendEmail.dto'
import { IEmailProvider } from '@/shared/domain/providers/email-provider'
import { Inject } from '@nestjs/common'

@Processor('TransactionSendEmail')
export class TransactionSendEmailProcessor {
  constructor(@Inject('EmailProvider') private emailProvider: IEmailProvider) {}

  @Process('transaction-send-email')
  async processSendEmail(job: Job<TransactionSendEmailDto>): Promise<void> {
    const data = job.data
    await this.emailProvider.sendEmail(data.receiverId, data.message)
  }
}
