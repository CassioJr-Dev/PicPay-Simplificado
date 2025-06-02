import { CreateTransferHandler } from './commands/createTransfer/create-transfer.transaction.handler'
import { DeleteExtractHandler } from './commands/deleteExtract/delete-extract.transaction.handler'
import { GetAllTransactionIdHandler } from './queries/getAll/getAll-transaction.handler'
import { GetTransactionByIdHandler } from './queries/getById/getById-transaction.handler'

export const CommandTransactionHandlers = [
  CreateTransferHandler,
  DeleteExtractHandler,
]

export const QueryTransactionHandlers = [
  GetAllTransactionIdHandler,
  GetTransactionByIdHandler,
]
