import { MigrationInterface, QueryRunner } from "typeorm";

export class FixFK1747151815555 implements MigrationInterface {
    name = 'FixFK1747151815555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject_entity" DROP CONSTRAINT "FK_1380fa88fa7bb134c30d8c083b9"`);
        await queryRunner.query(`ALTER TABLE "subject_entity" ALTER COLUMN "levelId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subject_entity" DROP CONSTRAINT "UQ_1380fa88fa7bb134c30d8c083b9"`);
        await queryRunner.query(`ALTER TABLE "subject_entity" ADD CONSTRAINT "FK_1380fa88fa7bb134c30d8c083b9" FOREIGN KEY ("levelId") REFERENCES "level_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject_entity" DROP CONSTRAINT "FK_1380fa88fa7bb134c30d8c083b9"`);
        await queryRunner.query(`ALTER TABLE "subject_entity" ADD CONSTRAINT "UQ_1380fa88fa7bb134c30d8c083b9" UNIQUE ("levelId")`);
        await queryRunner.query(`ALTER TABLE "subject_entity" ALTER COLUMN "levelId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subject_entity" ADD CONSTRAINT "FK_1380fa88fa7bb134c30d8c083b9" FOREIGN KEY ("levelId") REFERENCES "level_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
