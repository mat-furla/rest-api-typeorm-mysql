import { Router } from 'express';

import * as KeyController from '../controllers/key.controller';

const routes = Router();

// Return all keys
routes.get("/",
    KeyController.default.listAll
);

// Return key by id
routes.get("/:id",
    KeyController.default.getOneById
);

// Create new key
routes.post("/",
    KeyController.default.newKey
);

// Update key
routes.patch("/:id",
    KeyController.default.updateKey
);

// Delete key
routes.delete("/:id",
    KeyController.default.deleteKey
);

export default routes;