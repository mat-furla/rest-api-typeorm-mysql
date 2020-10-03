import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1601559546448 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    isUnique: true
                },
                {
                    name: 'username',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'role',
                    type: 'varchar',
                    isNullable: false,
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
        await queryRunner.dropTable("users");
    }
}
