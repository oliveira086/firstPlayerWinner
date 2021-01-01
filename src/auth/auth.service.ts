import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepopsitory: UserRepository,
  ) {}

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const matchCredentials = await this.userRepopsitory.signIn(
      authCredentialsDto,
    );

    if (!matchCredentials) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return 'token';
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepopsitory.signUp(authCredentialsDto);
  }
}
