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
    // Rechercher le sujet avec son niveau associé
    const subject = await this.subjectRepository.findOne({
      where: { name },
      relations: ['level'], // Charge la relation avec le niveau
    });

    if (!subject) {
      throw new Error(`Subject with name ${name} not found`);
    }

    // Si le niveau n'existe pas (cas improbable mais possible)
    if (!subject.level) {
      return {
        subjects: [
          {
            // Maintenant un tableau avec un seul élément
            id: subject.id,
            name: subject.name,
          },
        ],
        level: {
          id: 0,
          name: '',
        },
      };
    }

    // Retourne un objet conforme à l'interface InterfaceLevelSubject modifiée
    return {
      subjects: [
        {
          // Nous mettons le sujet actuel dans un tableau
          id: subject.id,
          name: subject.name,
        },
      ],
      level: {
        id: subject.level.id,
        name: subject.level.name,
      },
    };
  }

  findFavorite(): string {
    return this.configService.get('FAVORITE_SUBJECT');
  }
}
