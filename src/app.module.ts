import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypegooseModule } from './typegoose/typegoose.module'
import { AppService } from './app.service';
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule,
    TypegooseModule,
    GraphQLModule.forRoot({
      // set to true to automatically generate schema
      autoSchemaFile: true,
    }),
    UserModule
  ],
  providers: [AppService],
})
export class AppModule {}
