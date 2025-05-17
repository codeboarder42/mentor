import { CourseEntity } from 'src/course/entities/course.entity';
import { LevelEntity } from 'src/level/entities/level.entity';
import { SubjectEntity } from 'src/subject/entities/subject.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AnnounceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @ManyToOne(() => SubjectEntity, (subject) => subject.announces)
  @JoinColumn()
  subject: SubjectEntity;

  @ManyToOne(() => LevelEntity, (level) => level.announces)
  @JoinColumn()
  level: LevelEntity;

  @OneToMany(() => CourseEntity, (course) => course.announce)
  courses: CourseEntity[];

  @ManyToOne(() => UserEntity, (user) => user.announces)
  @JoinColumn()
  teacher: UserEntity;
}
