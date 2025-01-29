import { Entity } from '@/shared/domain/entities/entity'

export type TransactionProps = {
  amount: number
  senderId: string
  receiverId: string
}

export class TransactionrEntity extends Entity<TransactionProps> {
  constructor(props: TransactionProps, id?: string) {
    super(props, id)
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
}
