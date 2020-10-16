import {getRepository, MigrationInterface, QueryRunner} from "typeorm";

import { KeysSeed } from './../seeds/keys.seed';

export class CreateKeys1602740655052 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await getRepository("keys").save(KeysSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
