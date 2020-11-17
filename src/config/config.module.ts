import { Module } from '@nestjs/common'
import { ConfigModule as Config } from '@nestjs/config'
import { configuration } from './configuration'
import { validationSchema } from './validation'

@Module({
  imports: [
    Config.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
      envFilePath: ['admin-api.env']
    })
  ]
})
export class ConfigModule {}