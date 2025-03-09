import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Initial1741283742494 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ...existing code for other tables...

    const result = await queryRunner.query("SELECT to_regclass('public.categories') as exists");
    if (result.length > 0 && result[0].exists !== null) {
      console.log('Table "categories" already exists; skipping creation');
    } else {
      await queryRunner.createTable(
        new Table({
          name: "categories",
          columns: [
            { name: "id", type: "integer", isPrimary: true },
            { name: "title", type: "character varying", isNullable: false },
            { name: "description", type: "character varying", isNullable: false },
            { name: "createAt", type: "TIMESTAMP", default: "now()" },
            { name: "updatedAt", type: "TIMESTAMP", default: "now()" },
          ],
        }),
        true
      );
    }

    // ...existing code for users table or other migrations...
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // ...existing down migration code...
    const result = await queryRunner.query("SELECT to_regclass('public.categories') as exists");
    if (result.length > 0 && result[0].exists !== null) {
      await queryRunner.dropTable("categories");
    }
    // ...existing down migration code...
  }
}
