import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1601760113405 implements MigrationInterface {
    name = 'CreateTables1601760113405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `requisitions` (`id` varchar(36) NOT NULL, `id_key` int NOT NULL, `action` tinyint NOT NULL, `confirmed` tinyint NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `employeeId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `employees` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `sector` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `keys` (`id` varchar(255) NOT NULL, `available` tinyint NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_e63d5d51e0192635ab79aa4964` (`id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `engine` (`id` int NOT NULL, `position` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_a53ad5b7b5302ec9de3e1f384a` (`id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `requisitions` ADD CONSTRAINT `FK_21d1bc65be17c1c47ae7a636742` FOREIGN KEY (`employeeId`) REFERENCES `employees`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `requisitions` DROP FOREIGN KEY `FK_21d1bc65be17c1c47ae7a636742`");
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP INDEX `IDX_a53ad5b7b5302ec9de3e1f384a` ON `engine`");
        await queryRunner.query("DROP TABLE `engine`");
        await queryRunner.query("DROP INDEX `IDX_e63d5d51e0192635ab79aa4964` ON `keys`");
        await queryRunner.query("DROP TABLE `keys`");
        await queryRunner.query("DROP TABLE `employees`");
        await queryRunner.query("DROP TABLE `requisitions`");
    }

}
