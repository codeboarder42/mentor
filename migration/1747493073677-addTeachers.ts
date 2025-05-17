import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTeachers1747493073677 implements MigrationInterface {
    name = 'AddTeachers1747493073677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announce_entity" ADD "teacherId" integer`);
        await queryRunner.query(`ALTER TABLE "announce_entity" ADD CONSTRAINT "FK_e464272b12eaca2f533f34f2f55" FOREIGN KEY ("teacherId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announce_entity" DROP CONSTRAINT "FK_e464272b12eaca2f533f34f2f55"`);
        await queryRunner.query(`ALTER TABLE "announce_entity" DROP COLUMN "teacherId"`);
    }

}
