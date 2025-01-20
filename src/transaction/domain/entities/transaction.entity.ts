import { Entity } from '@/shared/domain/entities/entity'

export type TransactionProps = {
  amount: number
  sender: string
  receiver: string
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

  get sender() {
    return this.props.sender
  }

  private set sender(value: string) {
    this.props.sender = value
  }

  get receiver() {
    return this.props.receiver
  }

  private set receiver(value: string) {
    this.props.receiver = value
  }
}
