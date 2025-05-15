import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SubjectEntity } from './entities/subject.entity';
import { SubjectService } from './subject.service';

describe('SubjectService', () => {
  let service: SubjectService;
  let configService = { get: jest.fn() };
  let cacheManager = { get: jest.fn() };
  let subjectRepository = {
    findOneBy: jest.fn().mockImplementation((id) => {
      return {
        id: id,
        name: 'test-subject',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubjectService,
        {
          provide: ConfigService,
          useValue: configService,
        },
        {
          provide: CACHE_MANAGER,
          useValue: cacheManager,
        },
        {
          provide: getRepositoryToken(SubjectEntity),
          useValue: subjectRepository,
        },
      ],
    }).compile();

    service = module.get<SubjectService>(SubjectService);
  });

  describe('findOnebyId', () => {
    it('should return a subject by id', async () => {
      const spySubjectRepository = jest
        .spyOn(subjectRepository, 'findOneBy')
        .mockImplementation(() => ({
          id: 1,
          name: 'test-subject',
        }));
      const result = await service.findOneById(1);
      expect(spySubjectRepository).toHaveBeenCalledTimes(1);
      expect(spySubjectRepository).toHaveBeenCalledWith({ id: 1 });
      expect(result).toStrictEqual({
        id: 1,
        name: 'test-subject',
      });
    });

    it('should throw an error if subject not found', async () => {
      jest.spyOn(subjectRepository, 'findOneBy').mockImplementation(() => null);
      await expect(service.findOneById(1)).rejects.toThrow(
        `No subject found with id = 1`,
      );
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
