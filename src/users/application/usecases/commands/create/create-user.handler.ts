import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateUserCommand } from './create-user.command'
import { IUserRepositoryInterface } from '@/users/domain/repositories/user.repository'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { IHashProvider } from '@/users/domain/providers/hash-provider'
import { BadRequestError } from '@/shared/domain/errors/bad-request-error'
import { IEntityEventsDispatcher } from '@/shared/application/events/events-dispatcher-contract'
import { EntityEventBase } from '@/shared/domain/entities/entity-event-base'
import { UserSendEmailEvent } from '@/users/application/events/emailEvent/user-send-email.event'
import { Inject } from '@nestjs/common'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand, string>
{
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepositoryInterface,
    @Inject('HashProvider')
    private readonly hashProvider: IHashProvider,
    @Inject('EntityEventsDispatcher')
    private readonly eventDispatcher: IEntityEventsDispatcher,
  ) {}

  async execute(command: CreateUserCommand): Promise<string> {
    this.validateInput(command)

    const [emailExists, documentExists] = await Promise.all([
      this.userRepository.findByEmail(command.email),
      this.userRepository.findByDocument(command.document),
    ])

    if (emailExists || documentExists) {
      throw new ConflictError(
        `User already exists: ${emailExists ? 'Email' : ''} ${documentExists ? 'Document' : ''}`.trim(),
      )
    }

    const hashPassword = await this.hashProvider.generateHash(command.password)

    const entity = new UserEntity(
      Object.assign(command, { password: hashPassword }),
    )

    await this.userRepository.insert(entity)

    const eventBase = new EntityEventBase()
    eventBase.addEvent(new UserSendEmailEvent(entity.id, 'User Created'))
    await this.eventDispatcher.dispatch(eventBase)

    return entity.id
  }

  private validateInput(command: CreateUserCommand): void {
    const requiredFields = Object.keys(command)

    for (const field of requiredFields) {
      if (!command[field]) {
        throw new BadRequestError(`Field ${field} is required`)
      }
    }
  }
}
