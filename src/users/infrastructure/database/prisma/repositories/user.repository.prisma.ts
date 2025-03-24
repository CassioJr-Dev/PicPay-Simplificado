import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { IUserRepositoryInterface } from '@/users/domain/repositories/user.repository'
import { UserModelMapper } from '../models/user.model.mapper'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { ConflictError } from '@/shared/domain/errors/conflict-error'

export class UserPrismaRepository implements IUserRepositoryInterface {
  constructor(private prismaService: PrismaService) {}

  async documentExists(document: string): Promise<boolean> {
    const findUser = await this.prismaService.user.findUnique({
      where: { document },
    })

    if (findUser) {
      return true
    }

    return false
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const findUser = await this.prismaService.user.findUnique({
      where: { email },
    })

    return UserModelMapper.toEntity(findUser)
  }

  async emailExists(email: string): Promise<boolean> {
    const findUser = await this.prismaService.user.findUnique({
      where: { email },
    })

    if (findUser) {
      return true
    }

    return false
  }

  async insert(entity: UserEntity): Promise<void> {
    const documentExists = await this.documentExists(entity.document)
    const emailExists = await this.emailExists(entity.email)

    if (documentExists && emailExists) {
      throw new ConflictError('Both document and email already exist')
    } else if (documentExists) {
      throw new ConflictError('Document already exists')
    } else if (emailExists) {
      throw new ConflictError('Email already exists')
    }

    await this.prismaService.user.create({
      data: entity.toJSON(),
    })
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    })
    return UserModelMapper.toEntity(user)
  }

  async findAll(): Promise<UserEntity[]> {
    const models = await this.prismaService.user.findMany()
    return models.map(model => UserModelMapper.toEntity(model))
  }

  async update(entity: UserEntity): Promise<void> {
    await this.prismaService.user.update({
      where: { id: entity.id },
      data: entity.toJSON(),
    })
  }
  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: { id },
    })
  }

  protected async _get(id: string): Promise<UserEntity> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      })
      return UserModelMapper.toEntity(user)
    } catch {
      throw new NotFoundError(`UserModel not found using ID ${id}`)
    }
  }
}
