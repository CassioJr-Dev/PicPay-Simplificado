import { TransactionOutputDto } from '@/transaction/application/usecases/queries/dtos/transaction-output.dto'

export class ResponseTransactionDto implements TransactionOutputDto {
  id: string
  amount: number
  senderId: string
  receiverId: string
}
