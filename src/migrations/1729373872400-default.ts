import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1729373872400 implements MigrationInterface {
    name = 'Default1729373872400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "description"`);
    }

}
