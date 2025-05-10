import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { TransactionEntity } from '@/transaction/domain/entities/transaction.entity'
import { TransactionError } from '@/transaction/domain/errors/transaction-error'
import { ITransactionRepositoryInterface } from '@/transaction/domain/repositories/transaction.repository'
import { Prisma } from '@prisma/client'
import { TransactionModelMapper } from '../models/transaction.model.mapper'

export class TransactionPrismaRepository
  implements ITransactionRepositoryInterface
{
  constructor(private prismaService: PrismaService) {}

  async insert(
    entity: TransactionEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<TransactionEntity> {
    const prismaService = tx || this.prismaService
    const transferSave = await prismaService.transaction.create({
      data: entity.toJSON(),
    })

    return TransactionModelMapper.toEntity(transferSave)
  }

  async debit(
    userId: string,
    amount: number,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const prismaService = tx || this.prismaService

    await prismaService.user.update({
      where: { id: userId },
      data: { balance: { decrement: amount } },
    })
  }

  async credit(
    userId: string,
    amount: number,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const prismaService = tx || this.prismaService

    await prismaService.user.update({
      where: { id: userId },
      data: { balance: { increment: amount } },
    })
  }

  async transfer(entity: TransactionEntity): Promise<void> {
    try {
      await this.prismaService.$transaction(async tx => {
        await this.debit(entity.senderId, entity.amount, tx)
        await this.credit(entity.receiverId, entity.amount, tx)
        await this.insert(entity, tx)
      })
    } catch (error) {
      throw new TransactionError(`Transfer Error: ${error}`)
    }
  }

  async findById(id: string): Promise<TransactionEntity> {
    const transaction = await this.prismaService.transaction.findUnique({
      where: { id },
    })
    return transaction
      ? TransactionModelMapper.toEntity(transaction)
      : undefined
  }

  async findAll(userId?: string): Promise<TransactionEntity[]> {
    const models = await this.prismaService.transaction.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
    })
    return models.map(model => TransactionModelMapper.toEntity(model))
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.transaction.delete({
      where: { id },
    })
  }
}
