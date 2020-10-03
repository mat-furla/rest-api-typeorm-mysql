import { Router } from 'express';

import * as EmployeeController from '../controllers/employee.controller';

const routes = Router();

// Return all employees
routes.get("/",
    EmployeeController.default.listAll
);

// Return employee by id
routes.get("/:id",
    EmployeeController.default.getOneById
);

// Return employee by id
routes.post("/",
    EmployeeController.default.newEmployee
);

// Edit employee
routes.patch("/:id",
    EmployeeController.default.editEmployee
);

// Delete employee
routes.delete("/:id",
    EmployeeController.default.deleteEmployee
);

export default routes;