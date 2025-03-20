import { Test, TestingModule } from '@nestjs/testing'
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup.prisma.testing'
import { DatabaseModule } from '@/shared/infrastructure/database/database.module'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { TransactionPrismaRepository } from '../../transaction.repository.prisma'
import { TransactionEntity } from '@/transaction/domain/entities/transaction.entity'
import { TransactionDataBuilder } from '@/transaction/domain/testing/helpers/transaction-data-builder'
import { TransactionModelMapper } from '../../../models/transaction.model.mapper'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'

describe('TransactionPrismaRepository integration tests', () => {
  const prismaService = new PrismaService()
  let sut: TransactionPrismaRepository
  let sender: UserEntity
  let receiver: UserEntity
  let module: TestingModule

  beforeAll(async () => {
    setupPrismaTests()
    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile()
  })

  beforeEach(async () => {
    sender = new UserEntity(UserDataBuilder({}))
    receiver = new UserEntity(UserDataBuilder({}))

    const newUsers = await prismaService.user.createMany({
      data: [sender, receiver],
    })

    sut = new TransactionPrismaRepository(prismaService)
    await prismaService.transaction.deleteMany()
  })

  it('should finds a entity by id', async () => {
    const entity = new TransactionEntity(
      TransactionDataBuilder({ senderId: sender.id, receiverId: receiver.id }),
    )
    const newUser = await prismaService.transaction.create({
      data: entity.toJSON(),
    })

    const output = await sut.findById(newUser.id)
    expect(output.toJSON()).toStrictEqual(entity.toJSON())
  })

  it('should insert a new entity', async () => {
    const entity = new TransactionEntity(
      TransactionDataBuilder({ senderId: sender.id, receiverId: receiver.id }),
    )
    await sut.insert(entity)

    const output = await prismaService.transaction.findUnique({
      where: {
        id: entity.id,
      },
    })

    const result = TransactionModelMapper.toEntity(output)

    expect(result.toJSON()).toStrictEqual(entity.toJSON())
  })

  it('should returns all transactions', async () => {
    const entity = new TransactionEntity(
      TransactionDataBuilder({ senderId: sender.id, receiverId: receiver.id }),
    )
    await prismaService.transaction.create({
      data: entity.toJSON(),
    })

    const entities = await sut.findAll()
    expect(entities).toHaveLength(1)
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]))
    entities.map(item => expect(item.toJSON()).toStrictEqual(entity.toJSON()))
  })

  it('should delete a entity', async () => {
    const entity = new TransactionEntity(
      TransactionDataBuilder({ senderId: sender.id, receiverId: receiver.id }),
    )
    await prismaService.transaction.create({
      data: entity.toJSON(),
    })
    await sut.delete(entity.id)

    const output = await prismaService.transaction.findUnique({
      where: {
        id: entity.id,
      },
    })
    expect(output).toBeNull()
  })
})
