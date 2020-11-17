import { ObjectType, Field } from '@nestjs/graphql'
import {
  prop as Property, Ref, ModelOptions, plugin as Plugin, Post
} from '@typegoose/typegoose'
import { FilterableField } from '@nestjs-query/query-graphql'
import * as mongooseAutopopulate from 'mongoose-autopopulate'
import { User } from './user.entity'
import { Base } from '@typegoose/typegoose/lib/defaultClasses'

@ObjectType({
  description: 'The Base Object Type for m8a Data Objects'
})
@ModelOptions({
  schemaOptions: {
    timestamps: {
      updatedAt: 'modifiedAt'
    },
    toObject: { virtuals: true }
  }
})
// @Post(['find', 'insertMany', 'save'] as any, TypegooseMiddleware)
@Plugin(mongooseAutopopulate as any)
export class BaseEntity extends Base {
  
  @FilterableField(() => User, {
    description: 'The user who created the record.'
  })
  @Property({ ref: () => User, autopopulate: { maxDepth: 1 } })
  public createdBy: Ref<User>

  @Field(() => User, {
    description: 'The user who last modified the record.'
  })
  @Property({ ref: () => User, autopopulate: { maxDepth: 1 } })
  public modifiedBy: Ref<User>

  @Field({
    description:
      'A generic datetime field used within an m8a data object. It is a timestamp of the date and time when the record was modified.'
  })
  @Property()
  public modifiedAt?: Date

  @Field({
    description:
      'A generic datetime field used within an m8a data object. It is a timestamp of the date and time when the record was created.'
  })
  @Property()
  public createdAt?: Date

  public get id(): string {
    return this._id.toHexString();
  }
}
