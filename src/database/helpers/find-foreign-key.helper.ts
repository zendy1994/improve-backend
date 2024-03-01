import { QueryRunner, TableForeignKey } from 'typeorm';
import {
  ITableNames,
  TableNames,
} from '../../utils/constants/table-names.constant';

interface FindForeignKeyParams {
  queryRunner: QueryRunner;
  tableName: keyof ITableNames;
  key: string;
}

export async function findForeignKey(
  params: FindForeignKeyParams,
): Promise<TableForeignKey | undefined> {
  const { queryRunner, tableName, key } = params;
  const table = await queryRunner.getTable(TableNames[tableName]);
  if (table) {
    return table.foreignKeys.find((fk) => fk.columnNames.includes(key));
  }
  return undefined;
}
