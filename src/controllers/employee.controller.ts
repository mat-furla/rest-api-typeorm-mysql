import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Employee } from './../database/models/employee.model';

class EmployeeController {
    static listAll = async (req: Request, res: Response) => {
        const employeeRepository = getRepository(Employee);
        const employees = await employeeRepository.find();

        res.send(employees);
    };

    static getOneById = async (req: Request, res: Response) => {
        const id = req.params.id;

        const employeeRepository = getRepository(Employee);
        try {
            const employee = await employeeRepository.findOneOrFail(id);
            res.send(employee);
        } catch (error) {
            res.status(404).send({ "message": "Employee not found" });
        }
    };

    static nemEmployee = async (req: Request, res: Response) => {
        const { name, sector } = req.body;

        if (!(name && sector)) {
            return res.status(400).send({ "message": "Failed to create employee" });
        }

        const employee = new Employee();
        employee.name = name;
        employee.sector = sector;

        const errors = await validate(employee);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        const employeeRepository = getRepository(Employee);
        try {
            await employeeRepository.save(employee);
        } catch (e) {
            res.status(409).send({ "message": "Name already in use" });
            return;
        }

        res.status(201).send({ "message": "Employee created" });
    };

    static editEmployee = async (req: Request, res: Response) => {
        const id = req.params.id;
        const { name, sector } = req.body;

        if (!(name && sector)) {
            return res.status(400).send({ "message": "Failed to edit employee" });
        }

        const employeeRepository = getRepository(Employee);
        let employee;
        try {
            employee = await employeeRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send({ "message": "Employee not found" });
            return;
        }

        employee.name = name;
        employee.sector = sector;
        const errors = await validate(employee);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await employeeRepository.save(employee);
        } catch (e) {
            res.status(409).send({ "message": "Name already in use" });
            return;
        }

        res.status(204).send();
    };

    static deleteEmployee = async (req: Request, res: Response) => {
        const id = req.params.id;

        const employeeRepository = getRepository(Employee);
        let employee: Employee;
        try {
            employee = await employeeRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send({ "message": "Employee not found" });
            return;
        }
        employeeRepository.delete(id);

        res.status(204).send();
    };
};

export default EmployeeController;