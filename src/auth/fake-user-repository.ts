import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { User } from './User.entity';
import { UserRepository } from './user.repository';

class FakeUser extends User {
  id!: string;
  email!: string;
  password!: string;
  eletronicSignature!: string;
  name!: string;
  permission!: string;
  lastAccess!: Date;
  balance!: number;
  pixKey!: string;
  createdAt!: Date;
  updatadAt!: Date;
}

export class FakeUserRepository extends UserRepository {
  constructor(private users?: Array<FakeUser>) {
    super();
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    console.log(authCredentialsDto);
    return;
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<User | null> {
    const user = this.users?.find(
      ({ email }) => email === authCredentialsDto.email,
    );
    if (user && user.password === authCredentialsDto.password) {
      return user;
    }
    return null;
  }
}
