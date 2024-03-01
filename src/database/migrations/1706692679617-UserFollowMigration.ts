import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { findForeignKey } from '../helpers/find-foreign-key.helper';
import { TableNames } from '../../utils/constants/table-names.constant';
import { schemas } from '../constants/schemas.constant';

export class UserFollowMigration1706692679617 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableNames.USER_FOLLOW,
        columns: [
          schemas.id,
          schemas.createdAt,
          schemas.updatedAt,
          {
            name: 'follower_id',
            type: 'uuid',
          },
          {
            name: 'following_id',
            type: 'uuid',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      TableNames.USER_FOLLOW,
      new TableForeignKey({
        columnNames: ['follower_id'],
        referencedColumnNames: ['id'],
        referencedTableName: TableNames.USER,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      TableNames.USER_FOLLOW,
      new TableForeignKey({
        columnNames: ['following_id'],
        referencedColumnNames: ['id'],
        referencedTableName: TableNames.USER,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const followerForeignKey = await findForeignKey({
      queryRunner,
      tableName: TableNames.USER_FOLLOW,
      key: 'follower_id',
    });

    const followingForeignKey = await findForeignKey({
      queryRunner,
      tableName: TableNames.USER_FOLLOW,
      key: 'following_id',
    });

    await queryRunner.dropForeignKeys(TableNames.USER_FOLLOW, [
      followerForeignKey,
      followingForeignKey,
    ]);
    await queryRunner.dropTable(TableNames.USER_FOLLOW);
  }
}
