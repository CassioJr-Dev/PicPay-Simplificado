import { IEmailProvider } from '@/shared/domain/providers/email-provider'
import { PrismaService } from '../../database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SendEmailProvider implements IEmailProvider {
  constructor(private prismaService: PrismaService) {}

  async sendEmail(to: string, message: string): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: to,
      },
    })
    if (!user) return

    console.log(
      `Email enviado para ${user.firstName} ${user.lastName}
      Email: ${user.email},
      Message: ${message}`,
    )
  }
}
