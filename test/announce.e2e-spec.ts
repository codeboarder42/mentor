import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnnounceController } from 'src/announce/announce.controller';
import { AnnounceService } from 'src/announce/announce.service';
import { AnnounceEntity } from 'src/announce/entities/announce.entity';
import { LevelService } from 'src/level/level.service';
import { SubjectService } from 'src/subject/subject.service';

describe('Announce (e2e)', () => {
  let app: NestFastifyApplication;
  let service: AnnounceService;
  let subjectService = {
    findOneByName: jest.fn(),
  };
  let levelService = {
    findOneByName: jest.fn(),
  };
  let repository = {
    save: jest.fn(),
    findOneBy: jest.fn(),
  };
  beforeAll(async () => {
    try {
      const module = await Test.createTestingModule({
        controllers: [AnnounceController],
        providers: [
          AnnounceService,
          {
            provide: getRepositoryToken(AnnounceEntity),
            useValue: repository,
          },
          LevelService,
          SubjectService,
        ],
      })
        .overrideProvider(SubjectService)
        .useValue(subjectService)
        .overrideProvider(LevelService)
        .useValue(levelService)
        .compile();

      app = module.createNestApplication<NestFastifyApplication>(
        new FastifyAdapter(),
      );
      app.useGlobalPipes(new ValidationPipe());
      await app.init();
      await app.getHttpAdapter().getInstance().ready();
    } catch (error) {
      console.error('Error during app initialization:', error);
      throw error;
    }
  });

  describe('create announce', () => {
    const spyLevel = jest.spyOn(levelService, 'findOneByName');
    const spySubject = jest.spyOn(subjectService, 'findOneByName');
    const spyRepository = jest.spyOn(repository, 'save');
    const announceToCreate = {
      price: 100,
      level: {
        name: 'test-level',
      },
      subject: {
        name: 'test-subject',
      },
    };
    it('should create an announce', async () => {
      spyLevel.mockResolvedValue({
        id: 1,
        name: 'test-level',
      });
      spySubject.mockResolvedValue({
        id: 1,
        name: 'test-subject',
      });
      spyRepository.mockResolvedValue({
        id: 1,
        price: 100,
        level: {
          id: 1,
          name: 'test-level',
        },
        subject: {
          id: 1,
          name: 'test-subject',
        },
      });
      return app
        .inject({
          method: 'POST',
          url: '/announce',
          payload: announceToCreate,
        })
        .then((result) => {
          expect(result.statusCode).toEqual(201);
          expect(JSON.parse(result.payload)).toEqual({
            id: 1,
            price: 100,
            level: {
              id: 1,
              name: 'test-level',
            },
            subject: {
              id: 1,
              name: 'test-subject',
            },
          });
        });
    });

    it('should not create an announce with bad request price to high', async () => {
      return app
        .inject({
          method: 'POST',
          url: '/announce',
          payload: { ...announceToCreate, price: 250 },
        })
        .then((result) => {
          expect(result.statusCode).toEqual(400);
          expect(JSON.parse(result.payload)).toEqual({
            error: 'Bad Request',
            message: ['price must not be greater than 150'],
            statusCode: 400,
          });
        });
    });

    it('should not create an announce with bad request price to low', async () => {
      return app
        .inject({
          method: 'POST',
          url: '/announce',
          payload: { ...announceToCreate, price: -5 },
        })
        .then((result) => {
          expect(result.statusCode).toEqual(400);
          expect(JSON.parse(result.payload)).toEqual({
            error: 'Bad Request',
            message: ['price must not be less than 0'],
            statusCode: 400,
          });
        });
    });
  });

  describe('search announce', () => {
    const spyLevel = jest.spyOn(levelService, 'findOneByName');
    const spySubject = jest.spyOn(subjectService, 'findOneByName');
    const spyRepository = jest.spyOn(repository, 'findOneBy');

    it('should find an announce', async () => {
      spyLevel.mockResolvedValue({
        id: 1,
        name: 'test-level',
      });
      spySubject.mockResolvedValue({
        id: 1,
        name: 'test-subject',
      });
      spyRepository.mockResolvedValue({
        id: 1,
        price: 100,
        level: {
          id: 1,
          name: 'test-level',
        },
        subject: {
          id: 1,
          name: 'test-subject',
        },
      });
      return app
        .inject({
          method: 'GET',
          url: '/announce/search',
          query: {
            levelName: 'test-level',
            subjectName: 'test-subject',
          },
        })
        .then((result) => {
          expect(spyLevel).toHaveBeenCalledWith('test-level');
          expect(spySubject).toHaveBeenCalledWith('test-subject');
          expect(result.statusCode).toEqual(200);
          expect(JSON.parse(result.payload)).toEqual({
            id: 1,
            price: 100,
            level: {
              id: 1,
              name: 'test-level',
            },
            subject: {
              id: 1,
              name: 'test-subject',
            },
          });
        });
    });
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });
});
