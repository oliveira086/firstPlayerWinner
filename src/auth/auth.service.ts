import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { IAccessToken, JwtPayload } from './jwt';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepopsitory: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<IAccessToken> {
    const matchCredentials = await this.userRepopsitory.signIn(
      authCredentialsDto,
    );

    if (!matchCredentials) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload: JwtPayload = {
      email: matchCredentials.email,
      permission: matchCredentials.permission,
    };

    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepopsitory.signUp(authCredentialsDto);
  }
}
