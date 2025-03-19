import { IRepositoryInterface } from '@/shared/domain/repositories/repository-contract'
import { TransactionEntity } from '../entities/transaction.entity'

export interface ITransactionRepositoryInterface
  extends IRepositoryInterface<TransactionEntity> {
  debit(userId: string, amount: number, tx?: any): Promise<void>
  credit(userId: string, amount: number, tx?: any): Promise<void>
  transfer(transactionEntity: TransactionEntity): Promise<TransactionEntity>
}
