import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { BadRequestError } from '@/shared/domain/errors/bad-request-error'
import { DeleteExtractCommand } from './delete-extract.transaction.command'
import { ITransactionRepositoryInterface } from '@/transaction/domain/repositories/transaction.repository'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { Inject } from '@nestjs/common'

@CommandHandler(DeleteExtractCommand)
export class DeleteExtractHandler
  implements ICommandHandler<DeleteExtractCommand, void>
{
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: ITransactionRepositoryInterface,
  ) {}

  async execute(command: DeleteExtractCommand): Promise<void> {
    if (!command.id) {
      throw new BadRequestError(`Field document is required`)
    }

    const transactionExists = await this.transactionRepository.findById(
      command.id,
    )

    if (!transactionExists) {
      throw new NotFoundError(`Transaction not found with ${command.id}`)
    }

    await this.transactionRepository.delete(command.id)
  }
}
