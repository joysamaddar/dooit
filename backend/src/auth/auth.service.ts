import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { TokenType } from './types/token.type';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.user(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateJwt(id: string): Promise<User | UnauthorizedException> {
    const user = await this.userService.userWithId(id);
    if (user) {
      return user;
    }
    return null;
  }

  async signup(createUserInput): Promise<User | NotAcceptableException> {
    return await this.userService.createUser(createUserInput);
  }

  login(user: User): TokenType {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user._id,
      }),
      user,
    };
  }
}
