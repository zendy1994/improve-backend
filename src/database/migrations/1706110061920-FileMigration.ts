import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TableDB } from '../../common/enums/table-db.enum';

export class FileMigration1706110061920 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableDB.FILE,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'url',
            type: 'text',
          },
          {
            name: 'key',
            type: 'varchar',
          },
          {
            name: 'size',
            type: 'numeric',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'file_name',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableDB.FILE);
  }
}
