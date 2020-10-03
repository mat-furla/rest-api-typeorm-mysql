import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateKeysTable1601738853862 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'keys',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: 'rowid',
                    isUnique: true
                },
                {
                    name: 'available',
                    type: 'boolean',
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
        await queryRunner.dropTable("keys");
    }

}
