import { UserType } from '@/users/domain/enums/user.type.enum'

export type UserOutputDto = {
  id: string
  firstName: string
  lastName: string
  document: string
  email: string
  balance: number
  userType: UserType
}
