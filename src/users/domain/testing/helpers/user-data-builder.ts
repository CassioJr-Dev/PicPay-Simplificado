import { faker } from '@faker-js/faker/.'
import { UserType } from '../../enums/user.type.enum'
import { UserProps } from '../../entities/user.entity'

type Props = {
  firstName?: string
  lastName?: string
  document?: string
  email?: string
  balance?: number
  password?: string
  userType?: UserType
}

export function UserDataBuilder(props: Props): UserProps {
  return {
    firstName: props.firstName ?? faker.person.firstName(),
    lastName: props.lastName ?? faker.person.lastName(),
    document: props.document ?? faker.helpers.replaceSymbols('###.###.###-##'),
    email: props.email ?? faker.internet.email(),
    balance: props.balance ?? Number(faker.finance.amount({ min: 0.1 })),
    password: props.password ?? faker.internet.password(),
    userType: props.userType ?? UserType.COMMON,
  }
}
