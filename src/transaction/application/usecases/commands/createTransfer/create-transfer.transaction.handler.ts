import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { IUserRepositoryInterface } from '@/users/domain/repositories/user.repository'
import { BadRequestError } from '@/shared/domain/errors/bad-request-error'
import { IEntityEventsDispatcher } from '@/shared/application/events/events-dispatcher-contract'
import { CreateTransferCommand } from './create-transfer.transaction.command'
import { ITransactionRepositoryInterface } from '@/transaction/domain/repositories/transaction.repository'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { UserType } from '@/users/domain/enums/user.type.enum'
import { ForbiddenError } from '@/shared/domain/errors/forbidden-error'
import { authorizeTransfer } from '@/transaction/infrastructure/services/authorizeService'
import { TransactionEntity } from '@/transaction/domain/entities/transaction.entity'
import { EntityEventBase } from '@/shared/domain/entities/entity-event-base'
import { TransactionSendEmailEvent } from '@/transaction/application/events/emailEvent/transaction-send-email.event'
import { Inject } from '@nestjs/common'

@CommandHandler(CreateTransferCommand)
export class CreateTransferHandler
  implements ICommandHandler<CreateTransferCommand, string>
{
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: ITransactionRepositoryInterface,
    @Inject('UserRepository')
    private readonly userRepository: IUserRepositoryInterface,
    @Inject('EntityEventsDispatcher')
    private readonly eventDispatcher: IEntityEventsDispatcher,
  ) {}

  async execute(command: CreateTransferCommand): Promise<string> {
    this.validateInput(command)

    const [sender, receiver] = await Promise.all([
      this.userRepository.findById(command.senderId),
      this.userRepository.findById(command.receiverId),
    ])

    if (!sender || !receiver) {
      throw new NotFoundError(
        `User not found with: ${command.senderId ? 'senderId' : ''} ${command.receiverId ? 'reiceverId' : ''}`.trim(),
      )
    }

    if (sender.userType === UserType.LOGIST) {
      throw new ForbiddenError('The lojist cannot send transfers.')
    }

    if (sender.balance < command.amount) {
      throw new BadRequestError('Insufficient balance to make the transfer.')
    }

    const { status, authorization } = await authorizeTransfer()

    if (status === 'fail' && authorization === false) {
      throw new ForbiddenError(`Transfer ${status}`)
    }

    const entity = new TransactionEntity(command)

    await this.transactionRepository.transfer(entity)

    const eventBase = new EntityEventBase()
    eventBase.addEvent(
      new TransactionSendEmailEvent(
        entity.receiverId,
        `${receiver.firstName}, you received a transfer of
        ${entity.amount} reais from ${sender.firstName} ${sender.lastName}`,
      ),
    )
    await this.eventDispatcher.dispatch(eventBase)

    return entity.id
  }

  private validateInput(command: CreateTransferCommand): void {
    const requiredFields = Object.keys(command)

    for (const field of requiredFields) {
      if (!command[field]) {
        throw new BadRequestError(`Field ${field} is required`)
      }
    }
  }
}
