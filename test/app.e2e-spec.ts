import {Test} from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('Signup', () => {
      it.todo('Should Sign Up');
    });

    describe('Signin', () => {
      it.todo('Should Sign In');
    });
  });

  describe('User', () => {
    describe('Get me', () => { });

    describe('Edit user', () => { });
  });

  describe('Bookmarks', () => {
    describe('Create bookmark', () => {});

    describe('Get bookmark', () => {});
    
    describe('Get bookmark by id', () => {});

    describe('Edit bookmark', () => {});

    describe('Delete bookmark', () => {});
  })

  it.todo('should pass');
});
















// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import request from 'supertest';
// import { App } from 'supertest/types';
// import { AppModule } from './../src/app.module';

// describe('AppController (e2e)', () => {
//   let app: INestApplication<App>;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect('Hello World!');
//   });
// });
