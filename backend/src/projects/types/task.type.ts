import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Task')
export class TaskType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  status: string;
}
