import { IEmailProvider } from '@/shared/domain/providers/email-provider'
import { PrismaService } from '../../database/prisma/prisma.service'
import { Injectable, Logger } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class SendEmailProvider implements IEmailProvider {
  logger: Logger
  constructor(private prismaService: PrismaService) {}

  async sendEmail(to: string, message: string): Promise<void> {
    this.logger = new Logger()
    const user = await this.prismaService.user.findUnique({
      where: {
        id: to,
      },
    })

    if (!user) return

    axios.post('https://util.devi.tools/api/v1/notify')

    this.logger.log(`Email sent to${user.firstName} ${user.lastName}
      Email: ${user.email},
      Message: ${message}`)
  }
}
