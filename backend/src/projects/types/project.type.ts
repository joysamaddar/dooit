import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ObjectID } from 'typeorm';
import { Task } from '../models/task.entity';
import { TaskType } from './task.type';

@ObjectType('Project')
export class ProjectType {
  @Field(() => ID)
  _id: ObjectID;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [String], { defaultValue: [] })
  tags?: string[];

  @Field(() => [TaskType], { defaultValue: [] })
  tasks?: Task[];
}
