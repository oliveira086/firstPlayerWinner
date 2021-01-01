import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { User } from './User.entity';
const ER_DUP_ENTRY = 'ER_DUP_ENTRY';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const user = this.create();
    user.email = authCredentialsDto.email;
    user.password = authCredentialsDto.password;
    try {
      await user.save();
    } catch (error) {
      if (error.code === ER_DUP_ENTRY) {
        throw new ConflictException('User already exist');
      }
      throw new InternalServerErrorException();
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<User | null> {
    const user = await this.findOne({ email: authCredentialsDto.email });
    if (user && user.validatePassword(authCredentialsDto.password)) {
      return user;
    }
    return null;
  }
}
