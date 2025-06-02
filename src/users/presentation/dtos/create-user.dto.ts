import { UserType } from '@/users/domain/enums/user.type.enum'
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator'

export class CreateUserDto {
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
  @Min(0.1)
  @IsNotEmpty()
  balance: number

  @MaxLength(12)
  @MinLength(10)
  @IsString()
  @IsNotEmpty()
  password: string

  @MaxLength(100)
  @IsIn([UserType.COMMON, UserType.LOGIST], {
    message: 'userType must be a valid value: COMMON OR LOGIST.',
  })
  @IsNotEmpty()
  userType: UserType
}
