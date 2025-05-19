import { UserType } from '@/users/domain/enums/user.type.enum'

export class CreateUserCommand {
  firstName: string
  lastName: string
  document: string
  email: string
  balance: number
  password: string
  userType: UserType
}
