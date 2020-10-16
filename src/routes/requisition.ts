import { Router } from 'express';

import * as RequisitionController from '../controllers/requisition.controller';
import { checkJwt } from '../middlewares/checkJwt';

const routes = Router();

// Return all employees
routes.get("/",
    [checkJwt],
    RequisitionController.default.listAll
);

// Return requisition by id
routes.get("/:id",
    [checkJwt],
    RequisitionController.default.getOneById
);

// Create new requisition
routes.post("/",
    [checkJwt],
    RequisitionController.default.newRequisition
);

// Edit requisition
routes.patch("/:id",
    [checkJwt],
    RequisitionController.default.updateRequisition
);

// Delete requisition
routes.delete("/:id",
    [checkJwt],
    RequisitionController.default.deleteRequisition
);

export default routes;