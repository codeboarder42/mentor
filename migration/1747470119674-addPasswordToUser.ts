import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordToUser1747470119674 implements MigrationInterface {
    name = 'AddPasswordToUser1747470119674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "passwordHash" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "passwordHash"`);
    }

}
