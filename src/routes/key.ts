import { Router } from 'express';

import * as KeyController from '../controllers/key.controller';
import { checkJwt } from '../middlewares/checkJwt';

const routes = Router();

// Return all keys
routes.get("/",
    [checkJwt],
    KeyController.default.listAll
);

// Return key by id
routes.get("/:id",
    [checkJwt],
    KeyController.default.getOneById
);

// Create new key
routes.post("/",
    [checkJwt],
    KeyController.default.newKey
);

// Update key
routes.patch("/:id",
    [checkJwt],
    KeyController.default.updateKey
);

// Delete key
routes.delete("/:id",
    [checkJwt],
    KeyController.default.deleteKey
);

export default routes;