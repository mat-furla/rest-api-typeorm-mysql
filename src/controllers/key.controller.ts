import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Key } from './../database/models/key.model';

class KeyController {
    static listAll = async (req: Request, res: Response) => {
        const keyRepository = getRepository(Key);
        const keys = await keyRepository.find();

        res.send(keys);
    };

    static getOneById = async (req: Request, res: Response) => {
        const id = req.params.id;

        const keyRepository = getRepository(Key);
        try {
            const key = await keyRepository.findOneOrFail(id);
            res.send(key);
        } catch (error) {
            res.status(404).send({ "message": "Key not found" });
        }
    };

    static newKey = async (req: Request, res: Response) => {
        const { id, available } = req.body;

        if(!id){
            return res.status(400).send({ "message": "Failed to create key" }); 
        }

        const key = new Key();
        key.id = id;
        key.available = available;

        const errors = await validate(key);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        };

        const keyRepository = getRepository(Key);
        try {
            await keyRepository.save(key);
        } catch (e) {
            res.status(409).send({ "message": `e` });
            return;
        }

        res.status(201).send({ "message": "Key created" });
    };

    static updateKey = async (req: Request, res: Response) => {
        const id = req.params.id;
        const { available } = req.body;

        const keyRepository = getRepository(Key);
        let key;
        try {
            key = await keyRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send({ "message": "Key not found" });
            return;
        }

        key.available = available;
        const errors = await validate(key);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await keyRepository.save(key);
        } catch (e) {
            res.status(409).send({ "message": `e`});
            return;
        }

        res.status(204).send();
    };

    static deleteKey = async (req: Request, res: Response) => {
        const id = req.params.id;

        const keyRepository = getRepository(Key);
        let key: Key;
        try {
            key = await keyRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send({ "message": "Key not found" });
            return;
        }
        keyRepository.delete(id);

        res.status(204).send();
    };
};

export default KeyController;