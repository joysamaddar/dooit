import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class ChangePasswordInput {
  @Field()
  oldPassword: string;

  @Field()
  @MinLength(8, {
    message: 'Password must be longer than or equal to 8 characters',
  })
  newPassword: string;
}
