import { Router } from 'express';

import * as RequisitionController from '../controllers/requisition.controller';

const routes = Router();

// Return all employees
routes.get("/",
    RequisitionController.default.listAll
);

// Return requisition by id
routes.get("/:id",
    RequisitionController.default.getOneById
);

// Create new requisition
routes.post("/",
    RequisitionController.default.newRequisition
);

// Edit requisition
routes.patch("/:id",
    RequisitionController.default.updateRequisition
);

// Delete requisition
routes.delete("/:id",
    RequisitionController.default.deleteRequisition
);

export default routes;