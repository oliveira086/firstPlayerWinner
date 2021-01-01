import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { UserRepository } from './user.repository';

const mockRepository = {
  signIn: jest.fn(() => 'token'),
  signUp: jest.fn(),
};

describe('AuthService', () => {
  const makeCredentials = (): AuthCredentialsDto => {
    return {
      email: 'valid_email@domain.com',
      password: 'Valid123#Pass',
    };
  };

  let service: AuthService;
  let repository: UserRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('register user using signIn', async () => {
    const credentials = makeCredentials();
    expect(repository.signIn).not.toHaveBeenCalled();
    service.signIn(credentials);
    expect(repository.signIn).toHaveBeenCalledWith(credentials);
  });

  it('login using signUp', async () => {
    const credentials = makeCredentials();
    expect(repository.signUp).not.toHaveBeenCalled();
    service.signUp(credentials);
    expect(repository.signUp).toBeCalledWith(credentials);
  });
});
