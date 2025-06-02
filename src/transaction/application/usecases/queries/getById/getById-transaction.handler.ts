import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetByIdQuery } from './getById-transaction.query'
import { BadRequestError } from '@/shared/domain/errors/bad-request-error'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { ITransactionRepositoryInterface } from '@/transaction/domain/repositories/transaction.repository'
import { TransactionEntity } from '@/transaction/domain/entities/transaction.entity'
import { Inject } from '@nestjs/common'
import { TransactionOutputDto } from '../dtos/transaction-output.dto'

@QueryHandler(GetByIdQuery)
export class GetTransactionByIdHandler
  implements IQueryHandler<GetByIdQuery, TransactionOutputDto>
{
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: ITransactionRepositoryInterface,
  ) {}

  async execute(query: GetByIdQuery): Promise<TransactionOutputDto> {
    if (!query.id) {
      throw new BadRequestError(`Field id is required`)
    }

    const findTransaction = await this.transactionRepository.findById(query.id)

    if (!findTransaction) {
      throw new NotFoundError(`Transaction with id ${query.id} not found`)
    }

    return findTransaction.toJSON()
  }
}
