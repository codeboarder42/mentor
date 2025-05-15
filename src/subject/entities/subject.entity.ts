import { AnnounceEntity } from 'src/announce/entities/announce.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => AnnounceEntity, (announce) => announce.subject)
  announces: AnnounceEntity[];
}
