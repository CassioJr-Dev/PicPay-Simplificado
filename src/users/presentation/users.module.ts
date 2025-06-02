import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { UserPrismaRepository } from '../infrastructure/database/prisma/repositories/user.repository.prisma'
import { BcryptjsHashProvider } from '../infrastructure/providers/hash-provider/bcryptjs-hash.provider'
import { CqrsModule } from '@nestjs/cqrs'
import { BullModule } from '@nestjs/bull'
import { EntityEventsDispatcher } from '@/shared/application/events/entity-events-dispatcher'
import { CommandUserHandlers, QueryUserHandlers } from '../application/usecases'
import { EventUserHandlers } from '../application/events'
import { ProcessorUserQueues } from '../infrastructure/queues'
import { SendEmailProvider } from '@/shared/infrastructure/providers/email-provider/sendEmail.provider'

@Module({
  imports: [CqrsModule, BullModule.registerQueue({ name: 'UserSendEmail' })],
  providers: [
    ...ProcessorUserQueues,
    ...EventUserHandlers,
    ...CommandUserHandlers,
    ...QueryUserHandlers,
    {
      provide: 'UserRepository',
      useFactory: (prismaService: PrismaService) =>
        new UserPrismaRepository(prismaService),
      inject: [PrismaService],
    },
    {
      provide: 'EmailProvider',
      useClass: SendEmailProvider,
    },
    {
      provide: 'HashProvider',
      useClass: BcryptjsHashProvider,
    },
    {
      provide: 'EntityEventsDispatcher',
      useClass: EntityEventsDispatcher,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
