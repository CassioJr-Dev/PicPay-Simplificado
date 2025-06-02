import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateUserCommand } from './update-user.command'
import { IUserRepositoryInterface } from '@/users/domain/repositories/user.repository'
import { BadRequestError } from '@/shared/domain/errors/bad-request-error'
import { IHashProvider } from '@/users/domain/providers/hash-provider'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { EntityEventBase } from '@/shared/domain/entities/entity-event-base'
import { UserSendEmailEvent } from '@/users/application/events/emailEvent/user-send-email.event'
import { IEntityEventsDispatcher } from '@/shared/application/events/events-dispatcher-contract'
import { Inject } from '@nestjs/common'

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler
  implements ICommandHandler<UpdateUserCommand, string>
{
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepositoryInterface,
    @Inject('HashProvider')
    private readonly hashProvider: IHashProvider,
    @Inject('EntityEventsDispatcher')
    private readonly eventDispatcher: IEntityEventsDispatcher,
  ) {}

  async execute(command: UpdateUserCommand): Promise<string> {
    const { id, ...user } = command

    const hasAtLeastOneProperty = Object.values(user).some(
      value => value !== undefined,
    )
    if (!hasAtLeastOneProperty) {
      throw new BadRequestError('At least one property must be provided')
    }

    if (!id) {
      throw new BadRequestError(`Field id is required`)
    }

    const findUser = await this.userRepository.findById(id)
    if (!findUser) {
      throw new NotFoundError(`User with id ${id} not found`)
    }

    if (user.password) {
      const generateHash = await this.hashProvider.generateHash(user.password)
      user.password = generateHash
    }

    findUser.updateProperty({ ...user })

    const updateData = await this.userRepository.update(findUser)

    const eventBase = new EntityEventBase()
    eventBase.addEvent(new UserSendEmailEvent(updateData.id, 'User Updated'))
    this.eventDispatcher.dispatch(eventBase)

    return updateData.id
  }
}
