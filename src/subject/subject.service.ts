import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { SubjectEntity } from './entities/subject.entity';
import { InterfacePostSubject } from './subject';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
    @Inject('CACHE_MANAGER')
    private cacheManager: Cache,
    private configService: ConfigService,
  ) {}

  async findAll(): Promise<SubjectEntity[]> {
    const subjectCache =
      await this.cacheManager.get<SubjectEntity[]>('findAll');
    if (!subjectCache) {
      const subjects = await this.subjectRepository.find();
      await this.cacheManager.set('findAll', subjects, 0);
      return subjects;
    }
    return subjectCache;
  }

  async findOneById(id: number): Promise<SubjectEntity | null> {
    const subject = await this.subjectRepository.findOneBy({ id });
    if (!subject) {
      throw new HttpException(
        `No subject found with id = ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return subject;
  }

  findOneByName(name: string): Promise<SubjectEntity | null> {
    return this.subjectRepository.findOneBy({ name });
  }

  async createNewSubject({
    name,
  }: InterfacePostSubject): Promise<SubjectEntity> {
    return this.subjectRepository.save({
      name,
    });
  }

  findFavorite(): string {
    return (
      this.configService.get<string>('FAVORITE_SUBJECT') ?? 'defaultSubject'
    );
  }
}
