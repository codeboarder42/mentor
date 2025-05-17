import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCourses1747492732042 implements MigrationInterface {
    name = 'AddCourses1747492732042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course_entity" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "hours" integer NOT NULL, "strudentId" integer, "announceId" integer, CONSTRAINT "PK_9fcfc62edbcd9339ddd4a026e9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "course_entity" ADD CONSTRAINT "FK_fd519915d591efc8af723b759f0" FOREIGN KEY ("strudentId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_entity" ADD CONSTRAINT "FK_55e864ed28bfb52cf8562a28a82" FOREIGN KEY ("announceId") REFERENCES "announce_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_entity" DROP CONSTRAINT "FK_55e864ed28bfb52cf8562a28a82"`);
        await queryRunner.query(`ALTER TABLE "course_entity" DROP CONSTRAINT "FK_fd519915d591efc8af723b759f0"`);
        await queryRunner.query(`DROP TABLE "course_entity"`);
    }

}
