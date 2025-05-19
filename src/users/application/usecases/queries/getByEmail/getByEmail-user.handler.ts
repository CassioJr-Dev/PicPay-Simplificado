import { UserEntity } from '@/users/domain/entities/user.entity'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetByEmailQuery } from './getByEmail-user.query'
import { IUserRepositoryInterface } from '@/users/domain/repositories/user.repository'
import { BadRequestError } from '@/shared/domain/errors/bad-request-error'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { Inject } from '@nestjs/common'
import { UserOutputDto } from '../dtos/user-output.dto'

@QueryHandler(GetByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetByEmailQuery, UserOutputDto>
{
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepositoryInterface,
  ) {}

  async execute(query: GetByEmailQuery): Promise<UserOutputDto> {
    if (!query.email) {
      throw new BadRequestError(`Field email is required`)
    }

    const findUser = await this.userRepository.findByEmail(query.email)

    if (!findUser) {
      throw new NotFoundError(`User with email ${query.email} not found`)
    }

    const { password, ...user } = findUser.toJSON()
    return user
  }
}
