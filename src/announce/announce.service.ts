import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelService } from 'src/level/level.service';
import { SubjectService } from 'src/subject/subject.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { AnnounceEntity } from './entities/announce.entity';
import { CreateAnnounceDto } from './interface/create-announce.dto';

@Injectable()
export class AnnounceService {
  constructor(
    @InjectRepository(AnnounceEntity)
    private announceRepository: Repository<AnnounceEntity>,
    private levelService: LevelService,
    private subjectService: SubjectService,
    private userService: UserService,
  ) {}

  async createAnnounce({
    price,
    level: { name: levelName },
    subject: { name: subjectName },
    userId,
  }: CreateAnnounceDto & { userId: number }): Promise<AnnounceEntity> {
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new NotFoundException();
    }
    const level = await this.levelService.findOneByName(levelName);
    if (!level) {
      throw new HttpException(`level is not found`, HttpStatus.NOT_FOUND);
    }
    const subject = await this.subjectService.findOneByName(subjectName);
    if (!subject) {
      throw new HttpException(`subject is not found`, HttpStatus.NOT_FOUND);
    }
    const announce = this.announceRepository.save({
      price,
      level,
      subject,
      teacher: user,
    });
    return announce;
  }

  async searchAnnounce({
    levelName,
    subjectName,
  }: {
    levelName: string;
    subjectName: string;
  }): Promise<AnnounceEntity | null | string> {
    const level = await this.levelService.findOneByName(levelName);
    const subject = await this.subjectService.findOneByName(subjectName);

    if (!level || !subject) {
      throw new HttpException(
        `level or subject doesn't exists`,
        HttpStatus.FORBIDDEN,
      );
    }
    const announce = await this.announceRepository.findOneBy({
      level,
      subject,
    });
    if (!announce) {
      throw new HttpException(
        `No announce found linked to ${levelName} and  ${subjectName}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return announce;
  }

  findAll() {
    return `This action returns all announce`;
  }

  findOneById(id: number) {
    return this.announceRepository.findOneBy({ id });
  }

  update(id: number) {
    return `This action updates a #${id} announce`;
  }

  remove(id: number) {
    return `This action removes a #${id} announce`;
  }
}
