import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class DeleteUserDto {
  @MaxLength(255)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @MaxLength(12)
  @MinLength(10)
  @IsString()
  @IsNotEmpty()
  password: string
}
