import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields'
import { UserProps } from '../entities/user.entity'
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'
import { UserType } from '../enums/user.type.enum'

export class UserRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  firstName: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  lastName: string

  @MinLength(11)
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
    message: 'document must be a valid CPF or CNPJ',
  })
  document: string

  @MaxLength(255)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNumber()
  @IsNotEmpty()
  balance: number

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  password: string

  @MaxLength(100)
  @IsIn([UserType.COMMON, UserType.LOGIST], {
    message: 'userType must be a valid value.',
  })
  @IsNotEmpty()
  userType: UserType

  constructor(userProps: UserProps) {
    Object.assign(this, { ...userProps })
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: UserRules): boolean {
    return super.validate(new UserRules(data ?? ({} as UserProps)))
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator()
  }
}
