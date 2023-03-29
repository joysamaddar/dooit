import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  @MinLength(8, {
    message: 'Password must be longer than or equal to 8 characters',
  })
  password: string;
}
