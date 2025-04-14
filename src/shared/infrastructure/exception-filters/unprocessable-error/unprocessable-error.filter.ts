import { UnprocessableError } from '@/shared/domain/errors/unprocessable-error'
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'

@Catch(UnprocessableError)
export class UnprocessableErrorFilter implements ExceptionFilter {
  catch(exception: UnprocessableError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    response.status(422).send({
      statusCode: 422,
      error: 'Unprocessable Entity',
      message: exception.message,
    })
  }
}
