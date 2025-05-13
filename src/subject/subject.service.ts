import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/config.service';
import { InterfaceLevelSubject } from 'src/level/level';
import { Repository } from 'typeorm';
import { SubjectEntity } from './entities/subject.entity';
import { InterfacePostSubject } from './subject';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
    private configService: ConfigService,
  ) {}

  findAll(): Promise<SubjectEntity[]> {
    return this.subjectRepository.find();
  }

  findOneById(id: number): Promise<SubjectEntity | null> {
    return this.subjectRepository.findOneBy({ id });
  }

  async createNewSubject({
    name,
    levelId,
  }: InterfacePostSubject): Promise<SubjectEntity> {
    const newSubject = await this.subjectRepository.save({
      name,
    });
    return newSubject;
  }

  async levelAndSubjectFromName(name: string): Promise<InterfaceLevelSubject> {
    const subject = await this.subjectRepository.findOneBy({ name });
    if (!subject) {
      throw new Error(`Subject with name ${name} not found`);
    }
    return {
      subject: {
        id: subject.id,
        name: subject.name,
      },
      level: {
        id: subject.level?.id ?? 0,
        name: subject.level?.name ?? '',
      },
    };
  }

  findFavorite(): string {
    return this.configService.get('FAVORITE_SUBJECT');
  }
}
