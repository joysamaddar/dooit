import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

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
}
