import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteUserCommand } from './delete-user.command'
import { IUserRepositoryInterface } from '@/users/domain/repositories/user.repository'
import { BadRequestError } from '@/shared/domain/errors/bad-request-error'
import { IHashProvider } from '@/users/domain/providers/hash-provider'
import { UnauthorizedError } from '@/shared/domain/errors/Unathorized-error'
import { Inject } from '@nestjs/common'

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler
  implements ICommandHandler<DeleteUserCommand, void>
{
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepositoryInterface,
    @Inject('HashProvider')
    private readonly hashProvider: IHashProvider,
  ) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    this.validateInput(command)

    const user = await this.userRepository.findById(command.id)
    if (!user) {
      throw new BadRequestError('User not found')
    }

    if (user.email !== command.email) {
      throw new BadRequestError('Email does not match the user ID')
    }

    const compareHash = await this.hashProvider.compareHash(
      command.password,
      user.password,
    )
    if (!compareHash) {
      throw new UnauthorizedError('Invalid credentials')
    }

    await this.userRepository.delete(command.id)
  }

  private validateInput(command: DeleteUserCommand): void {
    const requiredFields = Object.keys(command)

    for (const field of requiredFields) {
      if (!command[field]) {
        throw new BadRequestError(`Field ${field} is required`)
      }
    }
  }
}
