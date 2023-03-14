import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @Field()
  @MinLength(3)
  name: string;

  @Field()
  @MinLength(3)
  description: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}
