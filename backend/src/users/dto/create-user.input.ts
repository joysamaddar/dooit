import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  @MinLength(8)
  password: string;
}
