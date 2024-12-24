import { Module } from '@nestjs/common'
import { EnvConfigService } from './env-config.service'
import { ConfigModule } from '@nestjs/config'
import Joi from 'joi'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.required(),
      }),
    }),
  ],
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}
