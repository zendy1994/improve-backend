import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { TableDB } from "../../common/enums/table-db.enum";

export class OtpMigration1706692517036 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableDB.OTP,
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "code",
            type: "varchar",
            length: "6",
          },
          {
            name: "expires_at",
            type: "timestamptz",
            default: "CURRENT_TIMESTAMP + INTERVAL '5 minutes'",
          },
          {
            name: "created_at",
            type: "timestamptz",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamptz",
            default: "now()",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableDB.OTP);
  }
}
