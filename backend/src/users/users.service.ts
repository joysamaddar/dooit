import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ChangePasswordInput } from './dto/change-password.input';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: MongoRepository<User>,
  ) {}

  async createUser(
    createUserInput: CreateUserInput,
  ): Promise<User | NotAcceptableException> {
    const { username, password } = createUserInput;
    if (await this.user(username)) {
      return new NotAcceptableException('User already exists!');
    }
    const user = new User();
    user.username = username;
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);
    return await this.userRepository.save(user);
  }

  async totalUsers(): Promise<number> {
    return await this.userRepository.count();
  }

  async users(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async user(username: string) {
    return await this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async userWithId(id: string): Promise<User> {
    return await this.userRepository.findOneBy({
      _id: new ObjectId(id),
    });
  }

  async changePassword(
    changePasswordInput: ChangePasswordInput,
    user: User,
  ): Promise<User | NotAcceptableException> {
    const { oldPassword, newPassword } = changePasswordInput;
    const result = await this.userRepository.findOne({
      where: {
        _id: new ObjectId(user._id),
      },
    });
    if (await bcrypt.compare(oldPassword, result.password)) {
      const salt = await bcrypt.genSalt();
      result.password = await bcrypt.hash(newPassword, salt);
      return await this.userRepository.save(result);
    } else {
      return new UnauthorizedException(
        'Please check your password and try again!',
      );
    }
  }
}
