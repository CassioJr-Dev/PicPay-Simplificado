import { Entity } from '@/shared/domain/entities/entity'
import { TransactionValidatorFactory } from '../validators/transaction.validator'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

export type TransactionProps = {
  amount: number
  senderId: string
  receiverId: string
}

export class TransactionEntity extends Entity<TransactionProps> {
  constructor(props: TransactionProps, id?: string) {
    TransactionEntity.validate(props)
    super(props, id)
  }

  updateProperty(transaction: Partial<TransactionProps>) {
    TransactionEntity.validate({
      ...this.props,
      ...transaction,
    })

    for (const key in transaction) {
      if (transaction[key] !== undefined) {
        ;(this.props as any)[key] = transaction[key]
      }
    }
  }

  get amount() {
    return this.props.amount
  }

  private set amount(value: number) {
    this.props.amount = value
  }

  get senderId() {
    return this.props.senderId
  }

  private set senderId(value: string) {
    this.props.senderId = value
  }

  get receiverId() {
    return this.props.receiverId
  }

  private set receiverId(value: string) {
    this.props.receiverId = value
  }

  static validate(props: TransactionProps) {
    const validator = TransactionValidatorFactory.create()
    const isValid = validator.validate(props)
    if (!isValid) {
      throw new EntityValidationError()
    }
  }
}
