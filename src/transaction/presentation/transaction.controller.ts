import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common'
import { CreateTransactionDto } from './dtos/create-transaction.dto'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { plainToClass } from 'class-transformer'
import { CreateTransferCommand } from '../application/usecases/commands/createTransfer/create-transfer.transaction.command'
import { DeleteExtractCommand } from '../application/usecases/commands/deleteExtract/delete-extract.transaction.command'
import { GetByIdQuery } from '../application/usecases/queries/getById/getById-transaction.query'
import { GetAllQuery } from '../application/usecases/queries/getAll/getAll-transaction.query'

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post(':id')
  async create(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    const command = plainToClass(CreateTransferCommand, {
      senderId: id,
      ...createTransactionDto,
    })
    const createTransaction: string = await this.commandBus.execute(command)

    const query = plainToClass(GetByIdQuery, { id: createTransaction })
    return this.queryBus.execute(query)
  }

  @Get(':id')
  async findTransactionById(@Param('id', ParseUUIDPipe) id: string) {
    const query = plainToClass(GetByIdQuery, { id })
    return this.queryBus.execute(query)
  }

  @Get(':userId/extract')
  async findAllTransactions(@Param('userId', ParseUUIDPipe) userId: string) {
    const query = plainToClass(GetAllQuery, { userId })
    return this.queryBus.execute(query)
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const command = plainToClass(DeleteExtractCommand, { id })
    return this.commandBus.execute(command)
  }
}
