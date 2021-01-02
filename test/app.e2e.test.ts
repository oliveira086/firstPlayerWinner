import supertest from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthCredentialsDto } from '../src/auth/dto/auth.credentials.dto';
import { assert } from 'console';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const makeCredentials = (props?: {
    email?: string;
    password?: string;
  }): AuthCredentialsDto => {
    return {
      email: props?.email ?? 'valid_email@domain.com',
      password: props?.password ?? 'Valid123#Pass',
    };
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return supertest(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/auth/signin (POST) invalid credential', () => {
    return supertest(app.getHttpServer())
      .post('/auth/signin')
      .send(makeCredentials())
      .set('Accept', 'application/json')
      .expect(401);
  });

  it('/auth/signup (POST) create an user', () => {
    return supertest(app.getHttpServer())
      .post('/auth/signup')
      .send(makeCredentials())
      .set('Accept', 'application/json')
      .expect(201);
  });

  it('/auth/signin (POST) get a token', () => {
    return supertest(app.getHttpServer())
      .post('/auth/signin')
      .send(makeCredentials())
      .set('Accept', 'application/json')
      .expect(201)
      .then((response) => {
        const resJS = JSON.parse(response.text);
        expect(resJS).toHaveProperty('accessToken');
      });
  });

  it('/auth/signup (POST) user already exist', () => {
    return supertest(app.getHttpServer())
      .post('/auth/signup')
      .send(makeCredentials())
      .set('Accept', 'application/json')
      .expect(409);
  });
});
