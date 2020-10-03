import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Requisition } from './../database/models/requisition.model';

class RequisitionController {
    static listAll = async (req: Request, res: Response) => {
        const requisitionRepository = getRepository(Requisition);
        const requisitions = await requisitionRepository.find();

        res.send(requisitions);
    };

    static getOneById = async (req: Request, res: Response) => {
        const id = req.params.id;

        const requisitionRepository = getRepository(Requisition);
        try {
            const requisition = await requisitionRepository.findOneOrFail(id);
            res.send(requisition);
        } catch (error) {
            res.status(404).send({ "message": "Requisition not found" });
        }
    };

    static newRequisition = async (req: Request, res: Response) => {
        const { employee, id_key, action } = req.body;

        if (!(employee && id_key)) {
            return res.status(400).send({ "message": "Failed to create requistion" });
        }

        const requisition = new Requisition();
        requisition.employee = employee;
        requisition.id_key = id_key;
        requisition.action = action;
        requisition.confirmed = false;

        const errors = await validate(requisition);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        const requisitionRepository = getRepository(Requisition);
        try {
            await requisitionRepository.save(requisition);
        } catch (err) {
            console.log(`Failed to create requisition: ${err}`)
            res.status(409).send({ "message": "Failed to create requisition" });
            return;
        }

        res.status(201).send({ "message": "Requisition created" });
    };

    static updateRequisition = async (req: Request, res: Response) => {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send({ "message": "Failed to update requisition" });
        }

        const requisitionRepository = getRepository(Requisition);
        let requisition;
        try {
            requisition = await requisitionRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send({ "message": "Requisition not found" });
            return;
        }

        requisition.confirmed = true;
        try {
            await requisitionRepository.save(requisition);
        } catch (err) {
            console.log(`Failed to update requisition: ${err}`);
            res.status(409).send({ "message": "Failed to update requisition" });
            return;
        }

        res.status(204).send(requisition);
    };

    static deleteRequisition = async (req: Request, res: Response) => {
        const id = req.params.id;

        const requisitionRepository = getRepository(Requisition);
        let requisition: Requisition;
        try {
            requisition = await requisitionRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send({ "message": "Requisition not found" });
            return;
        }
        requisitionRepository.delete(id);

        res.status(204).send({ "message": "Requisition deleted" });
    };
};

export default RequisitionController;