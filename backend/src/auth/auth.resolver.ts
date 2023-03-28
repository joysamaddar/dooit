import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { TokenType } from './types/token.type';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  signup(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.signup(createUserInput);
  }

  @Mutation(() => TokenType)
  @UseGuards(GqlAuthGuard)
  login(
    @Context() context,
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.authService.login(context.user);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  validateUser(@CurrentUser() user: User) {
    return user;
  }
}
