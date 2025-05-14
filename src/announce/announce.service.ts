import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelService } from 'src/level/level.service';
import { SubjectService } from 'src/subject/subject.service';
import { Repository } from 'typeorm';
import { AnnounceEntity } from './entities/announce.entity';
import { CreateAnnounceDto } from './interface/create-announce';

@Injectable()
export class AnnounceService {
  constructor(
    @InjectRepository(AnnounceEntity)
    private announceRepository: Repository<AnnounceEntity>,
    private levelService: LevelService,
    private subjectService: SubjectService,
  ) {}

  async createAnnounce({
    price,
    level: { name: levelName },
    subject: { name: subjectName },
  }: CreateAnnounceDto): Promise<AnnounceEntity> {
    const level = await this.levelService.findOneByName(levelName);
    const subject = await this.subjectService.findOneByName(subjectName);

    if (!level || !subject) {
      throw new HttpException(`bad request`, HttpStatus.BAD_REQUEST);
    }

    if (price < 0) {
      throw new HttpException(`price must be positive`, HttpStatus.BAD_REQUEST);
    }
    const announce = this.announceRepository.save({
      price,
      level,
      subject,
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

  findOne(id: number) {
    return `This action returns a #${id} announce`;
  }

  update(id: number) {
    return `This action updates a #${id} announce`;
  }

  remove(id: number) {
    return `This action removes a #${id} announce`;
  }
}
