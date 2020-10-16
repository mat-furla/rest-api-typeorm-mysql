import { Router } from 'express';

import * as EngineController from '../controllers/engine.controller';
import { checkJwt } from '../middlewares/checkJwt';

const routes = Router();

// Return engine by id
routes.get("/:id",
    [checkJwt],
    EngineController.default.getOneById
);

// Create new engine
routes.post("/",
    [checkJwt],
    EngineController.default.newEngine
);

// Update engine
routes.patch("/:id",
    [checkJwt],
    EngineController.default.updateEngine
);

export default routes;