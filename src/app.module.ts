import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module'
import { DatabaseModule } from './shared/infrastructure/database/database.module'
import { UsersModule } from './users/presentation/users.module'
import { TransactionController } from './transaction/presentation/transaction.controller'
import { TransactionModule } from './transaction/presentation/transaction.module'
import { BullModule } from '@nestjs/bull'
import { SendEmailProvider } from './shared/infrastructure/providers/email-provider/sendEmail.provider'
import { CqrsModule } from '@nestjs/cqrs'

@Module({
  imports: [
    BullModule.forRoot({
      redis: 'redis://localhost:6379',
      defaultJobOptions: {
        removeOnComplete: 100,
        removeOnFail: 1000,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    }),
    CqrsModule,
    EnvConfigModule,
    UsersModule,
    TransactionModule,
    DatabaseModule,
  ],
  controllers: [AppController, TransactionController],
  providers: [AppService],
})
export class AppModule {}
