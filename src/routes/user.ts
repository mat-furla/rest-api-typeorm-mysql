import { Router } from 'express';

import * as UserController from '../controllers/user.controller';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

const routes = Router();

// Return all users
routes.get("/",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.default.listAll
);

// Return user by id
routes.get("/:id",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.default.getOneById
);

// Create user
routes.post("/",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.default.newUser
);

// Edit user
routes.patch("/:id",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.default.editUser
);

// Delete user
routes.delete("/:id",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.default.deleteUser
);

export default routes;