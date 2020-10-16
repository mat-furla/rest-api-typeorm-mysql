import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { UserSeed } from './../seeds/user.seed';

export class CreateUser1602740676851 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await getRepository("users").save(UserSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
