import { UserOutputDto } from '@/users/application/usecases/queries/dtos/user-output.dto'
import { UserType } from '@/users/domain/enums/user.type.enum'

export class UserResponseDto implements UserOutputDto {
  id: string
  firstName: string
  lastName: string
  document: string
  email: string
  balance: number
  userType: UserType
}
