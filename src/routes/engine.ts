import { Router } from 'express';

import * as EngineController from '../controllers/engine.controller';

const routes = Router();

// Return engine by id
routes.get("/:id",
    EngineController.default.getOneById
);

// Create new engine
routes.post("/",
    EngineController.default.newEngine
);

// Update engine
routes.patch("/:id",
    EngineController.default.updateEngine
);

export default routes;