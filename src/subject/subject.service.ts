import { Inject, Injectable } from '@nestjs/common';
import { BddService } from 'src/bdd/bdd.service';
import { TOKEN_LEVELS } from 'src/bdd/constante';
import { ConfigService } from 'src/config/config.service';
import { InterfaceLevel, InterfaceLevelSubject } from 'src/level/level';
import { SUBJECTS } from './bdd';
import { InterfacePostSubject, InterfaceSubject } from './subject';

@Injectable()
export class SubjectService {
  constructor(
    private readonly bdd: BddService,
    @Inject(TOKEN_LEVELS) private bddLevels: InterfaceLevel[],
    private configService: ConfigService,
  ) {}
  findAll(): InterfaceSubject[] {
    return this.bdd.get<InterfaceSubject>('subjects');
  }

  createNewSubject({
    name,
    levelId,
  }: InterfacePostSubject): InterfaceSubject[] {
    const sortedByIdSubject = this.findAll().sort((a, b) => a.id - b.id);
    const newId = sortedByIdSubject[sortedByIdSubject.length - 1].id + 1;
    return [...SUBJECTS, { id: newId, name: name, levelId: levelId }];
  }

  findOneById(id: number): InterfaceSubject | undefined {
    return this.bdd.getById<InterfaceSubject>('subjects', id);
  }

  levelAndSubjectFromName(name: string): InterfaceLevelSubject[] {
    const subject = this.findAll().find((s) => s.name === name);
    const levels = this.bddLevels;
    const filteredLevels = levels.filter((l) => l.id === subject?.levelId);
    return filteredLevels.map((level) => ({
      level,
      subject,
    }));
  }

  findFavorite(): string {
    return this.configService.get('FAVORITE_SUBJECT');
  }
}
