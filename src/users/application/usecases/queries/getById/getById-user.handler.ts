import { UserEntity } from '@/users/domain/entities/user.entity'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetUserByIdQuery } from './getById-user.query'
import { IUserRepositoryInterface } from '@/users/domain/repositories/user.repository'
import { BadRequestError } from '@/shared/domain/errors/bad-request-error'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { Inject } from '@nestjs/common'
import { UserOutputDto } from '../dtos/user-output.dto'

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler
  implements IQueryHandler<GetUserByIdQuery, UserOutputDto>
{
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepositoryInterface,
  ) {}

  async execute(query: GetUserByIdQuery): Promise<UserOutputDto> {
    if (!query.id) {
      throw new BadRequestError(`Field id is required`)
    }

    const findUser = await this.userRepository.findById(query.id)

    if (!findUser) {
      throw new NotFoundError(`User with id ${query.id} not found`)
    }

    const { password, ...user } = findUser.toJSON()
    return user
  }
}
