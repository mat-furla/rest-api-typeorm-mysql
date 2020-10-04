import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Engine } from '../database/models/engine.model';

class EngineController {
    static getOneById = async (req: Request, res: Response) => {
        const id = req.params.id;

        const engineRepository = getRepository(Engine);
        try {
            const engine = await engineRepository.findOneOrFail(id);
            res.send(engine);
        } catch (error) {
            res.status(404).send({ "message": "Engine not found" });
        }
    };

    static newEngine = async (req: Request, res: Response) => {
        const engine = new Engine();
        engine.id = 1;
        engine.position = 0;

        const engineRepository = getRepository(Engine);
        try {
            await engineRepository.save(engine);
        } catch (err) {
            console.log(`Failed to create engine: ${err}`)
            res.status(409).send({ "message": "Failed to create engine" });
            return;
        }

        res.status(201).send(engine);
    };

    static updateEngine = async (req: Request, res: Response) => {
        const id = req.params.id;
        const { position } = req.body;

        const engineRepository = getRepository(Engine);
        let engine;
        try {
            engine = await engineRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send({ "message": "Engine not found" });
            return;
        }

        engine.position = position;
        const errors = await validate(position);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await engineRepository.save(engine);
        } catch (err) {
            console.log(`Failed to update engine: ${err}`)
            res.status(409).send({ "message": "Failed to update engine" });
            return;
        }

        res.status(204).send(engine);
    };
};

export default EngineController;