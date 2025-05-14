import { MigrationInterface, QueryRunner } from "typeorm";

export class FixAnnounce1747243550882 implements MigrationInterface {
    name = 'FixAnnounce1747243550882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "announce_entity_id_seq" OWNED BY "announce_entity"."id"`);
        await queryRunner.query(`ALTER TABLE "announce_entity" ALTER COLUMN "id" SET DEFAULT nextval('"announce_entity_id_seq"')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announce_entity" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "announce_entity_id_seq"`);
    }

}
