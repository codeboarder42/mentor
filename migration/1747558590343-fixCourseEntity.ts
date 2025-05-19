import { MigrationInterface, QueryRunner } from "typeorm";

export class FixCourseEntity1747558590343 implements MigrationInterface {
    name = 'FixCourseEntity1747558590343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_entity" DROP CONSTRAINT "FK_fd519915d591efc8af723b759f0"`);
        await queryRunner.query(`ALTER TABLE "course_entity" RENAME COLUMN "strudentId" TO "studentId"`);
        await queryRunner.query(`ALTER TABLE "course_entity" ADD CONSTRAINT "FK_2f95cd147553855306b4acffcec" FOREIGN KEY ("studentId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_entity" DROP CONSTRAINT "FK_2f95cd147553855306b4acffcec"`);
        await queryRunner.query(`ALTER TABLE "course_entity" RENAME COLUMN "studentId" TO "strudentId"`);
        await queryRunner.query(`ALTER TABLE "course_entity" ADD CONSTRAINT "FK_fd519915d591efc8af723b759f0" FOREIGN KEY ("strudentId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
