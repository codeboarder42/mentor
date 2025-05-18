import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnounceService } from 'src/announce/announce.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CourseEntity } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    private userService: UserService,
    private announceService: AnnounceService,
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
  ) {}
  async createCourse({
    announceId,
    studentId,
    date,
    hours,
  }: {
    announceId: number;
    studentId: number;
    date: Date;
    hours: number;
  }): Promise<CourseEntity> {
    const student = await this.userService.findOneById(studentId);
    if (!student) {
      throw new NotFoundException('User not found');
    }
    const announce = await this.announceService.findOneById(announceId);
    if (!announce) {
      throw new NotFoundException('Announce not found');
    }
    const course = await this.courseRepository.save({
      announce,
      student,
      date,
      hours,
    });
    return course;
  }
}
