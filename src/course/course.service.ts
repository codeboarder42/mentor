import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnounceService } from 'src/announce/announce.service';
import { Role } from 'src/user/interface/role';
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

  async findCourses(userId: number): Promise<CourseEntity[] | null> {
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role === Role.Teacher) {
      const teacheAnnounces = await this.announceService.findAllByUser(user);
      return teacheAnnounces.flatMap(({ courses }) => courses);
    }

    return this.courseRepository.findBy({ student: user });
  }

  async createCourses(
    announceId: number,
    hours: number,
    userId: number,
    date: Date,
  ) {
    const announce = await this.announceService.findOneById(announceId);
    if (!announce) {
      throw new NotFoundException('Announce not found');
    }
    const user = await this.userService.findOneById(userId);
    if (!user || user.role !== Role.Student) {
      throw new NotFoundException('User not found');
    }
    const course = this.courseRepository.save({
      announce,
      student: user,
      date,
      hours,
    });
  }
}
