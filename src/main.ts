import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { BadRequestErrorFilter } from './shared/infrastructure/exception-filters/bad-request-error/bad-request-error.filter'
import { ConflictErrorFilter } from './shared/infrastructure/exception-filters/conflict-error/conflict-error.filter'
import { NotFoundErrorFilter } from './shared/infrastructure/exception-filters/not-found-error/not-found-error.filter'
import { ForbiddenErrorFilter } from './shared/infrastructure/exception-filters/forbidden-error/forbiden-error.filter'
import { UnauthorizedErrorFilter } from './shared/infrastructure/exception-filters/unathorized-error/unathorized-error.filter'
import { UnprocessableErrorFilter } from './shared/infrastructure/exception-filters/unprocessable-error/unprocessable-error.filter'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppCluster } from './appCluster'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  app.useGlobalFilters(
    new BadRequestErrorFilter(),
    new ConflictErrorFilter(),
    new ForbiddenErrorFilter(),
    new NotFoundErrorFilter(),
    new UnauthorizedErrorFilter(),
    new UnprocessableErrorFilter(),
  )

  const config = new DocumentBuilder()
    .setTitle('PicPay-Simplificado')
    .setDescription('The documentation of API')
    .setVersion('1.0')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  app.enableCors()

  await app.listen(process.env.PORT ?? 3000)
}

AppCluster.clusterize(bootstrap)
