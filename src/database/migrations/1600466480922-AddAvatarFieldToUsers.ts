import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import tableNames from '../../constants/table-names';

export default class AddAvatarFieldToUsers1600466480922
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      tableNames.Users,
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(tableNames.Users, 'avatar');
  }
}
