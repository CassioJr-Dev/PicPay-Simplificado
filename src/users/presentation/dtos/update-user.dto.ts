import { UserType } from '@/users/domain/enums/user.type.enum'
import {
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator'

export class UpdateUserDto {
  @MaxLength(255)
  @IsString()
  @IsOptional()
  firstName: string

  @MaxLength(255)
  @IsString()
  @IsOptional()
  lastName: string

  @MaxLength(14)
  @MinLength(11)
  @IsString()
  @IsOptional()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
    message: 'document must be a valid CPF or CNPJ',
  })
  document: string

  @MaxLength(255)
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string

  @IsNumber()
  @Min(0.1)
  @IsOptional()
  balance: number

  @MaxLength(12)
  @MinLength(10)
  @IsString()
  @IsOptional()
  password: string

  @MaxLength(100)
  @IsIn([UserType.COMMON, UserType.LOGIST], {
    message: 'userType must be a valid value: COMMON OR LOGIST.',
  })
  @IsOptional()
  userType: UserType
}
