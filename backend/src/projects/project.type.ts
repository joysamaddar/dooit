import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';

@ObjectType('Project')
export class ProjectType {
  @Field(() => ID)
  _id: ObjectId;
  @Field()
  name: string;
  @Field()
  description: string;
  @Field(() => [String], { nullable: true, defaultValue: [] })
  tags?: string[];
}
