import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";
import { TableDB } from '../../common/enums/table-db.enum';
import { UserGender } from "../../common/enums/user.enum";

export class UserMigration1706111375580 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: TableDB.USER,
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: `uuid_generate_v4()`,
              },
              {
                name: 'email',
                type: 'varchar',
                isUnique: true,
              },
              {
                name: 'username',
                type: 'varchar',
                isUnique: true,
              },
              {
                name: 'password',
                type: 'varchar',
              },
              {
                name: 'first_name',
                type: 'varchar',
              },
              {
                name: 'last_name',
                type: 'varchar',
              },
              {
                name: 'date_of_birth',
                type: 'timestamptz',
                isNullable: true,
              },
              {
                name: 'gender',
                type: 'enum',
                enum: [UserGender.MALE, UserGender.FEMALE, UserGender.OTHER],
                enumName: 'user-gender-enum',
                isNullable: true,
              },
              {
                name: 'avatar_id',
                type: 'uuid',
                isNullable: true,
              },
              {
                name: 'created_at',
                type: 'timestamptz',
                default: 'now()',
              },
              {
                name: 'updated_at',
                type: 'timestamptz',
                default: 'now()',
              },
            ],
          }),
          true,
        );

        await queryRunner.createIndex(
          TableDB.USER,
          new TableIndex({
            name: 'email_idx',
            columnNames: ['email'],
          }),
        );

        await queryRunner.createIndex(
          TableDB.USER,
          new TableIndex({
            name: 'username_idx',
            columnNames: ['username'],
          }),
        );
    
        await queryRunner.createForeignKey(
          TableDB.USER,
          new TableForeignKey({
            columnNames: ['avatar_id'],
            referencedColumnNames: ['id'],
            referencedTableName: TableDB.FILE,
            onDelete: 'CASCADE',
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(TableDB.USER);
        const avatarForeignKey = table.foreignKeys.find(
          (fk) => fk.columnNames.indexOf('avatar_id') !== -1,
        );

        await queryRunner.dropForeignKeys(TableDB.USER, [avatarForeignKey]);
        await queryRunner.dropIndex(TableDB.USER, 'email_idx');
        await queryRunner.dropIndex(TableDB.USER, 'username_idx');
        await queryRunner.dropTable(TableDB.USER);
      }
    }
    