import { Entity } from '@/shared/domain/entities/entity'
import { UserType } from '../enums/user.type.enum'
import { UserValidatorFactory } from '../validators/user.validator'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

export type UserProps = {
  firstName: string
  lastName: string
  document: string
  email: string
  balance: number
  password: string
  userType: UserType
}

export class UserEntity extends Entity<UserProps> {
  constructor(props: UserProps, id?: string, createdAt?: Date) {
    UserEntity.validate(props)
    super(props, id, createdAt)
  }

  updateProperty(user: Partial<UserProps>) {
    UserEntity.validate({
      ...this.props,
      ...user,
    })

    for (const key in user) {
      if (user[key] !== undefined) {
        ;(this.props as any)[key] = user[key]
      }
    }
  }

  get firstName() {
    return this.props.firstName
  }

  private set firstName(value: string) {
    this.props.firstName = value
  }

  get lastName() {
    return this.props.lastName
  }

  private set lastName(value: string) {
    this.props.lastName = value
  }

  get document() {
    return this.props.document
  }

  private set document(value: string) {
    this.props.document = value
  }

  get email() {
    return this.props.email
  }

  private set email(value: string) {
    this.props.email = value
  }

  get balance() {
    return this.props.balance
  }

  private set balance(value: number) {
    this.props.balance = value
  }

  get password() {
    return this.props.password
  }

  private set password(value: string) {
    this.props.password = value
  }

  get userType() {
    return this.props.userType
  }

  private set userType(value: UserType) {
    this.props.userType = value
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create()
    const isValid = validator.validate(props)
    if (!isValid) {
      throw new EntityValidationError()
    }
  }
}
