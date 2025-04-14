import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { UnauthorizedError } from '@/shared/domain/errors/Unathorized-error'
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'

@Catch(UnauthorizedError)
export class UnauthorizedErrorFilter implements ExceptionFilter {
  catch(exception: UnauthorizedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    response.status(401).send({
      statusCode: 401,
      error: 'Unauthorized',
      message: exception.message,
    })
  }
}
