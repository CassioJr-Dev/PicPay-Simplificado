import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields'
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator'
import { TransactionProps } from '../entities/transaction.entity'

export class TransactionRules {
  @Min(0.1)
  @IsNumber()
  @IsNotEmpty()
  amount: number

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  sender: string

  @IsString()
  @IsNotEmpty()
  receiver: string

  constructor(userProps: TransactionProps) {
    Object.assign(this, { ...userProps })
  }
}

export class TransactionValidator extends ClassValidatorFields<TransactionRules> {
  validate(data: TransactionRules): boolean {
    return super.validate(
      new TransactionRules(data ?? ({} as TransactionProps)),
    )
  }
}

export class TransactionValidatorFactory {
  static create(): TransactionValidator {
    return new TransactionValidator()
  }
}
