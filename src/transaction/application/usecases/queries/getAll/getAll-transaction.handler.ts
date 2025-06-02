import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetAllQuery } from './getAll-transaction.query'
import { BadRequestError } from '@/shared/domain/errors/bad-request-error'
import { ITransactionRepositoryInterface } from '@/transaction/domain/repositories/transaction.repository'
import { TransactionEntity } from '@/transaction/domain/entities/transaction.entity'
import { Inject } from '@nestjs/common'
import { TransactionOutputDto } from '../dtos/transaction-output.dto'

@QueryHandler(GetAllQuery)
export class GetAllTransactionIdHandler
  implements IQueryHandler<GetAllQuery, TransactionOutputDto[]>
{
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: ITransactionRepositoryInterface,
  ) {}

  async execute(query: GetAllQuery): Promise<TransactionOutputDto[]> {
    if (!query.userId) {
      throw new BadRequestError(`Field userId is required`)
    }

    const findTransaction = await this.transactionRepository.findAll(
      query.userId,
    )

    return findTransaction.map(entity => entity.toJSON())
  }
}
