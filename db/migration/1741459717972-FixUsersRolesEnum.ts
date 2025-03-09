import { MigrationInterface, QueryRunner } from "typeorm";

export class FixUsersRolesEnum1741459717972 implements MigrationInterface {
    name = 'FixUsersRolesEnum1741459717972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_roles_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roles" "public"."users_roles_enum" array NOT NULL DEFAULT '{user}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
        await queryRunner.query(`DROP TYPE "public"."users_roles_enum"`);
    }

}
