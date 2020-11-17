import { Module } from '@nestjs/common'
import { NestjsQueryTypegooseModule } from '@nestjs-query/query-typegoose'
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql'
import { User } from './user.entity'
import { RegisterService, UserAssembler } from './register.service'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypegooseModule.forFeature([User])],
      services: [RegisterService],
      assemblers: [UserAssembler],
      resolvers: [
        {
          DTOClass: User,
          EntityClass: User,
          ServiceClass: RegisterService
        }
      ],
    }),
  ],
  providers: [RegisterService],
  exports: [RegisterService]
})
export class UserModule {}