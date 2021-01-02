import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthCredentialsDto } from '../dto/auth.credentials.dto';
import { User } from '../User.entity';
import { UserRepository } from '../user.repository';
import { ER_DUP_ENTRY } from '../user.repository';

describe('user.repository', () => {
  const makeCredentials = (): AuthCredentialsDto => {
    return {
      email: 'valid_email@domain.com',
      password: 'Valid123#Pass',
    };
  };
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('signUp', () => {
    let user: User;
    beforeEach(() => {
      user = new User();
      user.email = makeCredentials().email;
      user.password = makeCredentials().password;
      user.encriptPassword = jest.fn();
      user.save = jest.fn();
      userRepository.create = jest.fn();
    });

    it('should successfully signs up the user', async () => {
      user.save = jest.fn().mockResolvedValue(undefined);
      userRepository.create = jest.fn().mockReturnValue(user);
      user.encriptPassword = jest.fn().mockResolvedValue('encriptedPassword');
      expect(userRepository.signUp(makeCredentials())).resolves.not.toThrow();
    });

    it('should throws a conflict exception as username already exists', async () => {
      user.encriptPassword = jest.fn().mockResolvedValue('encriptedPassword');
      userRepository.create = jest.fn().mockReturnValue(user);

      user.save = jest.fn().mockRejectedValue({ code: ER_DUP_ENTRY });
      expect(userRepository.signUp(makeCredentials())).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throws a generic server exception if error', async () => {
      user.encriptPassword = jest.fn().mockResolvedValue('encriptedPassword');
      userRepository.create = jest.fn().mockReturnValue(user);

      user.save = jest.fn().mockRejectedValue({ code: 'ANY_CODE' });
      expect(userRepository.signUp(makeCredentials())).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('should validate password', () => {
    let user: User;
    beforeEach(() => {
      user = new User();
      user.email = makeCredentials().email;
      user.password = makeCredentials().password;
      user.validatePassword = jest.fn();
    });

    it('should return the token as validation is successfully', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(user);
      user.validatePassword = jest.fn().mockResolvedValue(true);
      const result = await userRepository.signIn(makeCredentials());
      expect(result).toEqual(user);
    });

    it('should return null if user not found', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(null);
      const result = await userRepository.signIn(makeCredentials());
      expect(user.validatePassword).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('should return null if provide a invalid password', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(user);
      user.validatePassword = jest.fn().mockResolvedValue(false);
      const result = await userRepository.signIn(makeCredentials());
      expect(result).toBeNull();
    });
  });
});
