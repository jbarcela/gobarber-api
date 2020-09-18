import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

import TableNames from '../../constants/table-names';

export default class AlterProviderFieldToProviderId1600123938762
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(TableNames.Appointments, 'provider');
    await queryRunner.addColumn(
      TableNames.Appointments,
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      TableNames.Appointments,
      new TableForeignKey({
        name: 'appointment_provider',
        columnNames: ['provider_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      TableNames.Appointments,
      'appointment_provider',
    );
    await queryRunner.dropColumn(TableNames.Appointments, 'provider_id');
    await queryRunner.addColumn(
      TableNames.Appointments,
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
