import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { AuthCredentialsDto } from '../dto/auth.credentials.dto';
import { UserRepository } from '../user.repository';

const mockRepository = {
  signIn: jest.fn(() => ({ accessToken: 'token' })),
  signUp: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(() => ({ accessToken: 'token' })),
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
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        AuthService,
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    jwtService = module.get<JwtService>(JwtService);
    service = module.get<AuthService>(AuthService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should register user using signIn and return a token', async () => {
    const credentials = makeCredentials();
    expect(repository.signIn).not.toHaveBeenCalled();
    expect(jwtService.sign).not.toHaveBeenCalled();
    service.signIn(credentials);
    expect(repository.signIn).toHaveBeenCalledWith(credentials);
    expect(repository.signIn(makeCredentials())).toEqual({
      accessToken: 'token',
    });
  });

  it('login using signUp', async () => {
    const credentials = makeCredentials();
    expect(repository.signUp).not.toHaveBeenCalled();
    service.signUp(credentials);
    expect(repository.signUp).toBeCalledWith(credentials);
  });
});
