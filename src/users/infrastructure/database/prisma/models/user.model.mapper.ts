import { UnprocessableError } from '@/shared/domain/errors/unprocessable-error'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserType } from '@/users/domain/enums/user.type.enum'
import { User } from '@prisma/client'

export class UserModelMapper {
  static toEntity(model: User) {
    const parseBalance = Number(model.balance.toString())
    const parseUserType =
      model.userType === UserType.COMMON ? UserType.COMMON : UserType.LOGIST

    const data = {
      firstName: model.firstName,
      lastName: model.lastName,
      document: model.document,
      email: model.email,
      balance: parseBalance,
      password: model.password,
      userType: parseUserType,
    }

    try {
      return new UserEntity(data, model.id, model.createdAt)
    } catch {
      throw new UnprocessableError('An entity not be loaded')
    }
  }
}
