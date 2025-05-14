import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAnnounce1747240233702 implements MigrationInterface {
    name = 'AddAnnounce1747240233702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject_entity" DROP CONSTRAINT "FK_1380fa88fa7bb134c30d8c083b9"`);
        await queryRunner.query(`CREATE TABLE "announce_entity" ("id" integer NOT NULL, "price" integer NOT NULL, "subjectId" integer, "levelId" integer, CONSTRAINT "PK_fde015c5dddc244c414eec35af0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "announce_entity" ADD CONSTRAINT "FK_2118f2c1988da41bcf77c75f3b2" FOREIGN KEY ("subjectId") REFERENCES "subject_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "announce_entity" ADD CONSTRAINT "FK_225f58c89ce5156ea2d30e0e4a8" FOREIGN KEY ("levelId") REFERENCES "level_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announce_entity" DROP CONSTRAINT "FK_225f58c89ce5156ea2d30e0e4a8"`);
        await queryRunner.query(`ALTER TABLE "announce_entity" DROP CONSTRAINT "FK_2118f2c1988da41bcf77c75f3b2"`);
        await queryRunner.query(`DROP TABLE "announce_entity"`);
        await queryRunner.query(`ALTER TABLE "subject_entity" ADD CONSTRAINT "FK_1380fa88fa7bb134c30d8c083b9" FOREIGN KEY ("levelId") REFERENCES "level_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
