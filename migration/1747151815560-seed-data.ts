import { MigrationInterface, QueryRunner } from 'typeorm';
import { initLevel, initSubject } from './data';

export class SeedData1747151815560 implements MigrationInterface {
  name = 'SeedData1747151815560';
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const level of initLevel) {
      await queryRunner.query(
        `INSERT INTO level_entity (name, id) VALUES ('${level.name}', ${level.id})`,
      );
    }
    for (const subject of initSubject) {
      await queryRunner.query(
        `INSERT INTO subject_entity (name, "levelId") VALUES ('${subject.name}', ${subject.levelId})`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE subject_entity`);
    await queryRunner.query(`TRUNCATE level_entity`);
  }
}

