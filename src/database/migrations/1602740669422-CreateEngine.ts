import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { EngineSeed } from './../seeds/engine.seed';

export class CreateEngine1602740669422 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const keys = await getRepository("engine").save(EngineSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
