import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { TableNames } from '../../utils/constants/table-names.constant';

export class UserFollowMigration1706692679617 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableNames.USER_FOLLOW,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'follower_id',
            type: 'uuid',
          },
          {
            name: 'following_id',
            type: 'uuid',
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
      true
    );

    await queryRunner.createForeignKey(
      TableNames.USER_FOLLOW,
      new TableForeignKey({
        columnNames: ['follower_id'],
        referencedColumnNames: ['id'],
        referencedTableName: TableNames.USER,
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      TableNames.USER_FOLLOW,
      new TableForeignKey({
        columnNames: ['following_id'],
        referencedColumnNames: ['id'],
        referencedTableName: TableNames.USER,
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(TableNames.USER_FOLLOW);
    const followingForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('follower_id') !== -1
    );
    const followerForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('following_id') !== -1
    );

    await queryRunner.dropForeignKeys(TableNames.USER_FOLLOW, [
      followingForeignKey,
      followerForeignKey,
    ]);
    await queryRunner.dropTable(TableNames.USER_FOLLOW);
  }
}
