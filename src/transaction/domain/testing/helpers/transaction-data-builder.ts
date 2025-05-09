import { faker } from '@faker-js/faker/.'
import { randomUUID } from 'node:crypto'
import { TransactionProps } from '../../entities/transaction.entity'

type Props = {
  amount?: number
  senderId?: string
  receiverId?: string
}

export function TransactionDataBuilder(props: Props): TransactionProps {
  return {
    amount:
      props.amount ??
      Number(
        faker.finance.amount({
          min: 0.1,
        }),
      ),
    senderId: props.senderId ?? randomUUID(),
    receiverId: props.receiverId ?? randomUUID(),
  }
}
