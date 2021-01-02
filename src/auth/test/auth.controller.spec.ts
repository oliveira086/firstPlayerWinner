import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { AuthCredentialsDto } from '../dto/auth.credentials.dto';
import { UserRepository } from '../user.repository';

describe('AuthController', () => {
  const makeCredentials = (): AuthCredentialsDto => {
    return {
      email: 'valid_email@domain.com',
      password: 'Valid123#Pass',
    };
  };

  let controller: AuthController;
  const mockRepository = {
    signIn: jest.fn(() => 'token'),
    signUp: jest.fn(() => 'success'),
  };

  const mockService = {
    signIn: jest.fn(() => mockRepository.signIn()),
    signUp: jest.fn(() => mockRepository.signUp()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
        {
          provide: AuthService,
          useValue: mockService,
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call signin', async () => {
    const credentials = makeCredentials();
    const signInSpy = jest.spyOn(controller, 'signIn');
    expect(controller.signIn(credentials)).toBe('token');
    expect(signInSpy).toHaveBeenCalledWith(credentials);
  });

  it('should call signup', async () => {
    const credentials = makeCredentials();
    const signUpSpy = jest.spyOn(controller, 'signUp');
    expect(controller.signUp(credentials)).toBe('success');
    expect(signUpSpy).toHaveBeenCalledWith(credentials);
  });
});
