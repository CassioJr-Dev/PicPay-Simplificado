import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { DeleteUserDto } from './dtos/delete-user.dto'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { plainToClass } from 'class-transformer'
import { CreateUserCommand } from '../application/usecases/commands/create/create-user.command'
import { UpdateUserCommand } from '../application/usecases/commands/update/update-user.command'
import { GetUserByIdQuery } from '../application/usecases/queries/getById/getById-user.query'
import { GetByDocumentQuery } from '../application/usecases/queries/getByDocument/getByDocument-user.query'
import { GetByEmailQuery } from '../application/usecases/queries/getByEmail/getByEmail-user.query'
import { DeleteUserCommand } from '../application/usecases/commands/delete/delete-user.command'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { UserResponseDto } from './dtos/response-user.dto'

@Controller('users')
export class UsersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @ApiCreatedResponse({
    type: UserResponseDto,
  })
  @ApiConflictResponse({
    description: 'User already exists: Email || Document',
  })
  @ApiBadRequestResponse({
    description: `Field is required`,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const command = plainToClass(CreateUserCommand, createUserDto)
    const createUser: string = await this.commandBus.execute(command)

    const query = plainToClass(GetUserByIdQuery, { id: createUser })
    return this.queryBus.execute(query)
  }

  @ApiOkResponse({
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: `Field is required`,
  })
  @ApiBadRequestResponse({
    description: `At least one property must be provided`,
  })
  @ApiNotFoundResponse({
    description: 'User with id not found',
  })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const command = plainToClass(UpdateUserCommand, { id, ...updateUserDto })
    const updateData: string = await this.commandBus.execute(command)

    const query = plainToClass(GetUserByIdQuery, { id: updateData })
    return this.queryBus.execute(query)
  }

  @ApiOkResponse({
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: `Field is required`,
  })
  @ApiNotFoundResponse({
    description: 'User with id not found',
  })
  @Get('id/:id')
  async findUserById(@Param('id', ParseUUIDPipe) id: string) {
    const query = plainToClass(GetUserByIdQuery, { id })
    return this.queryBus.execute(query)
  }

  @ApiOkResponse({
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: `Field is required`,
  })
  @ApiNotFoundResponse({
    description: 'User with document not found',
  })
  @Get('find-document')
  async findUserByDocument(@Query('document') document: string) {
    const query = plainToClass(GetByDocumentQuery, { document })
    return this.queryBus.execute(query)
  }

  @ApiOkResponse({
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: `Field is required`,
  })
  @ApiNotFoundResponse({
    description: 'User with email not found',
  })
  @Get('find-email')
  async findUserByEmail(@Query('email') email: string) {
    const query = plainToClass(GetByEmailQuery, { email })
    return this.queryBus.execute(query)
  }

  @ApiNoContentResponse({
    description: 'No Content',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @ApiBadRequestResponse({
    description: `Field is required`,
  })
  @ApiBadRequestResponse({
    description: `Email does not match the user Id`,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @HttpCode(204)
  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() deleteUserDto: DeleteUserDto,
  ) {
    const command = plainToClass(DeleteUserCommand, { id, ...deleteUserDto })
    return this.commandBus.execute(command)
  }
}
