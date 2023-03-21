import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { ChangePasswordInput } from './dto/change-password.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  users() {
    return this.usersService.users();
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  user(@Args('username') username: string) {
    return this.usersService.user(username);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  changePassword(
    @Args('changePasswordInput') changePasswordInput: ChangePasswordInput,
    @CurrentUser() user: User,
  ) {
    return this.usersService.changePassword(changePasswordInput, user);
  }
}
