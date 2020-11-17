import { Assembler, AssemblerQueryService, ClassTransformerAssembler, QueryService, InjectQueryService } from '@nestjs-query/core'
import { User } from './user.entity'
import * as argon2 from 'argon2'
import { argon2id } from 'argon2'
import { RegisterInputDTO } from './register.input.dto'
import { UserInputError, ApolloError } from 'apollo-server-express'
import { Injectable } from '@nestjs/common'

@Assembler(User, User)
export class UserAssembler extends ClassTransformerAssembler<User, User> { }

@Injectable()
@QueryService(User)
export class RegisterService extends AssemblerQueryService<User, User> {
  constructor(
    readonly assembler: UserAssembler,
    @InjectQueryService(User) private readonly service: QueryService<User>) {
    super(assembler, service)
  }

  async register(registerInput: RegisterInputDTO): Promise<User> {
    console.log(registerInput)
    const hashedPassword = await argon2.hash(registerInput.password, {
      type: argon2id
    })

    const sysUser = await this.service.query({
      filter:
      {
        userName:
          { eq: 'admin@m8a.io.admin' }
      }
    })

    if (sysUser.length === 0) {
      throw new ApolloError(
        'There was a problem with locating the system user for the registration process. Please see your admin for help.',
        '10001'
      )
    }

    const locatedUser = await this.service.query({
      filter:
      {
        userName:
          { eq: registerInput.email }
      }
    })

    if (locatedUser) {
      throw new UserInputError('This user already exists.')
    }

     const user = await this.service.createOne({
      firstName: registerInput.firstName,
      lastName: registerInput.lastName,
      email: registerInput.email,
      userName: registerInput.email,
      password: hashedPassword,
      status: 'Registered', // TODO: need proper email verification
      createdBy: sysUser[0]._id,
      modifiedBy: sysUser[0]._id
    })

    return user
  }
}
