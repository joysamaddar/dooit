import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Task } from './task.entity';

@Entity()
@ObjectType('Project')
export class Project {
  @ObjectIdColumn()
  @Field(() => ID)
  _id: ObjectID;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column({ default: [] })
  @Field(() => [String], { defaultValue: [] })
  tags?: string[];

  @Column(() => Task, { array: true })
  @Field(() => [Task], { defaultValue: [] })
  tasks?: Task[];
}
