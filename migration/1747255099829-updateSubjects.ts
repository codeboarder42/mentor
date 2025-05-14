import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSubjects1747255099829 implements MigrationInterface {
    name = 'UpdateSubjects1747255099829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject_entity" DROP COLUMN "levelId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject_entity" ADD "levelId" integer NOT NULL`);
    }

}
