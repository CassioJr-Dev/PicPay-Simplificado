import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { UserSendEmailDto } from './user-sendEmail.dto'
import { IEmailProvider } from '@/shared/domain/providers/email-provider'
import { Inject } from '@nestjs/common'

@Processor('UserSendEmail')
export class UserSendEmailProcessor {
  constructor(@Inject('EmailProvider') private emailProvider: IEmailProvider) {}

  @Process('user-send-email')
  async processSendEmail(job: Job<UserSendEmailDto>): Promise<void> {
    const data = job.data
    await this.emailProvider.sendEmail(data.id, data.message)
  }
}
