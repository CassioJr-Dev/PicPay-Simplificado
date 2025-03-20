import { EntityValidationError } from '@/shared/domain/errors/validation-error'
import { TransactionEntity } from '@/transaction/domain/entities/transaction.entity'
import { Transaction } from '@prisma/client'

export class TransactionModelMapper {
  static toEntity(model: Transaction) {
    const parseAmount = Number(model.amount.toString())

    const data = {
      amount: parseAmount,
      senderId: model.senderId,
      receiverId: model.receiverId,
    }

    try {
      return new TransactionEntity(data, model.id, model.createdAt)
    } catch {
      throw new EntityValidationError('An entity not be loaded')
    }
  }
}
