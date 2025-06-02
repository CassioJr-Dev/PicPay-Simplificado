import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetByDocumentQuery } from './getByDocument-user.query'
import { IUserRepositoryInterface } from '@/users/domain/repositories/user.repository'
import { BadRequestError } from '@/shared/domain/errors/bad-request-error'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { Inject } from '@nestjs/common'
import { UserOutputDto } from '../dtos/user-output.dto'

@QueryHandler(GetByDocumentQuery)
export class GetUserByDocumentHandler
  implements IQueryHandler<GetByDocumentQuery, UserOutputDto>
{
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepositoryInterface,
  ) {}

  async execute(query: GetByDocumentQuery): Promise<UserOutputDto> {
    if (!query.document) {
      throw new BadRequestError(`Field document is required`)
    }

    const findUser = await this.userRepository.findByDocument(query.document)

    if (!findUser) {
      throw new NotFoundError(`User with document ${query.document} not found`)
    }

    const { password, ...user } = findUser.toJSON()
    return user
  }
}
