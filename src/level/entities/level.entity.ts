import { SubjectEntity } from 'src/subject/entities/subject.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => SubjectEntity, (subject) => subject.level)
  subjects: SubjectEntity[];
}
