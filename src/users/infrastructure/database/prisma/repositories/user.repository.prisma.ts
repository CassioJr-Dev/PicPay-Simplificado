import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { IUserRepositoryInterface } from '@/users/domain/repositories/user.repository'
import { UserModelMapper } from '../models/user.model.mapper'

export class UserPrismaRepository implements IUserRepositoryInterface {
  constructor(private prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<UserEntity> {
    const findUser = await this.prismaService.user.findUnique({
      where: { email },
    })

    return findUser ? UserModelMapper.toEntity(findUser) : undefined
  }

  async findByDocument(document: string): Promise<UserEntity> {
    const findUser = await this.prismaService.user.findUnique({
      where: { document },
    })

    return findUser ? UserModelMapper.toEntity(findUser) : undefined
  }

  async insert(entity: UserEntity): Promise<void> {
    await this.prismaService.user.create({
      data: entity.toJSON(),
    })
  }

  async findById(id: string): Promise<UserEntity> {
    const findUser = await this.prismaService.user.findUnique({
      where: { id },
    })
    return findUser ? UserModelMapper.toEntity(findUser) : undefined
  }

  async findAll(): Promise<UserEntity[]> {
    const models = await this.prismaService.user.findMany()
    return models.map(model => UserModelMapper.toEntity(model))
  }

  async update(entity: UserEntity): Promise<UserEntity> {
    const updateUser = await this.prismaService.user.update({
      where: { id: entity.id },
      data: entity.toJSON(),
    })

    return UserModelMapper.toEntity(updateUser)
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: { id },
    })
  }
}
