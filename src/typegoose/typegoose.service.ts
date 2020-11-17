import { getConnectionToken } from 'nestjs-typegoose'
import { Injectable, Inject } from '@nestjs/common'
import { Connection } from 'mongoose'

@Injectable()
export class TypegooseService {
  constructor(@Inject(getConnectionToken()) private connection: Connection) {}

  async dropDb(): Promise<any> {
    await this.connection.dropDatabase()
  }
}
