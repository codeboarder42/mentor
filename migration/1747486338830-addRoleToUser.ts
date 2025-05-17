import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleToUser1747486338830 implements MigrationInterface {
    name = 'AddRoleToUser1747486338830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "role" character varying NOT NULL DEFAULT 'admin'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "role"`);
    }

}
