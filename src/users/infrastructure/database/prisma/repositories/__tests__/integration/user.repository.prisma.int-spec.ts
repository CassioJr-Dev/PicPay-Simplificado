import { PrismaClient } from '@prisma/client'
import { UserPrismaRepository } from '../../user.repository.prisma'
import { Test, TestingModule } from '@nestjs/testing'
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup.prisma.testing'
import { DatabaseModule } from '@/shared/infrastructure/database/database.module'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { UserModelMapper } from '../../../models/user.model.mapper'
import { UserType } from '@/users/domain/enums/user.type.enum'

describe('UserPrismaRepository integration tests', () => {
  const prismaService = new PrismaService()
  let sut: UserPrismaRepository
  let module: TestingModule

  beforeAll(async () => {
    setupPrismaTests()
    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile()
  })

  beforeEach(async () => {
    sut = new UserPrismaRepository(prismaService)
    await prismaService.user.deleteMany()
  })

  it('should finds a entity by id', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    const newUser = await prismaService.user.create({
      data: entity.toJSON(),
    })

    const output = await sut.findById(newUser.id)
    expect(output.toJSON()).toStrictEqual(entity.toJSON())
  })

  it('should insert a new entity', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    await sut.insert(entity)

    const output = await prismaService.user.findUnique({
      where: {
        id: entity.id,
      },
    })

    const result = UserModelMapper.toEntity(output)

    expect(result.toJSON()).toStrictEqual(entity.toJSON())
  })

  it('should returns all users', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    await prismaService.user.create({
      data: entity.toJSON(),
    })

    const entities = await sut.findAll()
    expect(entities).toHaveLength(1)
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]))
    entities.map(item => expect(item.toJSON()).toStrictEqual(entity.toJSON()))
  })

  it('should update a entity', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    const newUser = await prismaService.user.create({
      data: entity.toJSON(),
    })
    entity.updateProperty({ firstName: 'new name' })
    await sut.update(entity)

    const output = await prismaService.user.findUnique({
      where: {
        id: entity.id,
      },
    })
    expect(output.firstName).toBe('new name')
  })

  it('should delete a entity', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    await prismaService.user.create({
      data: entity.toJSON(),
    })
    await sut.delete(entity.id)

    const output = await prismaService.user.findUnique({
      where: {
        id: entity.id,
      },
    })
    expect(output).toBeNull()
  })

  it('you must check if the email exists', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    await prismaService.user.create({
      data: entity.toJSON(),
    })

    const output = await sut.emailExists(entity.email)
    expect(output).toBeTruthy()
  })

  it('should finds a entity by email', async () => {
    const entity = new UserEntity(
      UserDataBuilder({ email: 'a@a.com', userType: UserType.LOGIST }),
    )
    await prismaService.user.create({
      data: entity.toJSON(),
    })
    const output = await sut.findByEmail('a@a.com')

    expect(output.toJSON()).toStrictEqual(entity.toJSON())
  })
})
