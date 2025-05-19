import { CreateUserHandler } from './commands/create/create-user.handler'
import { DeleteUserHandler } from './commands/delete/delete-user.handler'
import { UpdateUserHandler } from './commands/update/update-user.handler'
import { GetUserByDocumentHandler } from './queries/getByDocument/getByDocument-user.handler'
import { GetUserByEmailHandler } from './queries/getByEmail/getByEmail-user.handler'
import { GetUserByIdHandler } from './queries/getById/getById-user.handler'

export const CommandUserHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
]

export const QueryUserHandlers = [
  GetUserByIdHandler,
  GetUserByEmailHandler,
  GetUserByDocumentHandler,
]
