import { Field, ID, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field(() => ID, { nullable: false })
  projectId: string;

  @Field()
  @MinLength(3)
  name: string;

  @Field()
  @MinLength(2)
  type: string;
}
