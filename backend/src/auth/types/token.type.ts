import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType('Token')
export class TokenType {
  @Field()
  access_token: string;

  @Field(() => User)
  user: User;
}
