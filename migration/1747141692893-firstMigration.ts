import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1747141692893 implements MigrationInterface {
    name = 'FirstMigration1747141692893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject_entity" ADD "levelId" integer`);
        await queryRunner.query(`ALTER TABLE "subject_entity" ADD CONSTRAINT "UQ_1380fa88fa7bb134c30d8c083b9" UNIQUE ("levelId")`);
        await queryRunner.query(`ALTER TABLE "subject_entity" ADD CONSTRAINT "FK_1380fa88fa7bb134c30d8c083b9" FOREIGN KEY ("levelId") REFERENCES "level_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject_entity" DROP CONSTRAINT "FK_1380fa88fa7bb134c30d8c083b9"`);
        await queryRunner.query(`ALTER TABLE "subject_entity" DROP CONSTRAINT "UQ_1380fa88fa7bb134c30d8c083b9"`);
        await queryRunner.query(`ALTER TABLE "subject_entity" DROP COLUMN "levelId"`);
    }

}
