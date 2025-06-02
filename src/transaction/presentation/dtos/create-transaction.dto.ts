import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator'

export class CreateTransactionDto {
  @Min(0.1)
  @IsNumber()
  @IsNotEmpty()
  amount: number

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  receiverId: string
}
