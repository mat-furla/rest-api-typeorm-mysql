import { Router } from 'express';

import * as EmployeeController from '../controllers/employee.controller';
import { checkJwt } from '../middlewares/checkJwt';

const routes = Router();

// Return all employees
routes.get("/",
    [checkJwt],
    EmployeeController.default.listAll
);

// Return employee by id
routes.get("/:id",
    [checkJwt],
    EmployeeController.default.getOneById
);

// Return employee by id
routes.post("/",
    [checkJwt],
    EmployeeController.default.newEmployee
);

// Edit employee
routes.patch("/:id",
    [checkJwt],
    EmployeeController.default.updateEmployee
);

// Delete employee
routes.delete("/:id",
    [checkJwt],
    EmployeeController.default.deleteEmployee
);

export default routes;