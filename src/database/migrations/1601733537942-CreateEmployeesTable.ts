import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEmployeesTable1601733537942 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'employees',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    isUnique: true
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'sector',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'created_at',
                    type:  'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type:  'timestamp',
                    default: 'now()'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("employees");
    }
}
