import { EntityEventsDispatcher } from '@/shared/application/events/entity-events-dispatcher'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TransactionPrismaRepository } from '../infrastructure/database/prisma/repositories/transaction.repository.prisma'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { UserPrismaRepository } from '@/users/infrastructure/database/prisma/repositories/user.repository.prisma'
import { TransactionController } from './transaction.controller'
import {
  CommandTransactionHandlers,
  QueryTransactionHandlers,
} from '../application/usecases'
import { EventTransactionHandlers } from '../application/events'
import { ProcessorTransactionQueues } from '../infrastructure/queues'
import { SendEmailProvider } from '@/shared/infrastructure/providers/email-provider/sendEmail.provider'

@Module({
  imports: [
    CqrsModule,
    BullModule.registerQueue({ name: 'TransactionSendEmail' }),
  ],
  providers: [
    ...ProcessorTransactionQueues,
    ...EventTransactionHandlers,
    ...CommandTransactionHandlers,
    ...QueryTransactionHandlers,
    {
      provide: 'EntityEventsDispatcher',
      useClass: EntityEventsDispatcher,
    },
    {
      provide: 'EmailProvider',
      useClass: SendEmailProvider,
    },
    {
      provide: 'TransactionRepository',
      useFactory: (prismaService: PrismaService) => {
        return new TransactionPrismaRepository(prismaService)
      },
      inject: [PrismaService],
    },
    {
      provide: 'UserRepository',
      useFactory: (prismaService: PrismaService) => {
        return new UserPrismaRepository(prismaService)
      },
      inject: [PrismaService],
    },
  ],
  controllers: [TransactionController],
})
export class TransactionModule {}
