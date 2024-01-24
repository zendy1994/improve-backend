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
                name: 'password',
                type: 'varchar',
              },
              {
                name: 'full_name',
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
                enumName: 'gender-enum',
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
            name: 'emailIdx',
            columnNames: ['email'],
          }),
        );
    
        await queryRunner.createForeignKey(
          TableDB.USER,
          new TableForeignKey({
            columnNames: ['avatarId'],
            referencedColumnNames: ['id'],
            referencedTableName: TableDB.FILE,
            onDelete: 'CASCADE',
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(TableDB.USER);
        const avatarForeignKey = table.foreignKeys.find(
          (fk) => fk.columnNames.indexOf('avatarId') !== -1,
        );

        await queryRunner.dropForeignKeys(TableDB.USER, [avatarForeignKey]);
        await queryRunner.dropIndex(TableDB.USER, 'emailIdx');
        await queryRunner.dropTable(TableDB.USER);
      }
    }
    