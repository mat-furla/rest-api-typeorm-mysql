import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../database/models/user.model.';

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = res.locals.jwtPayload.userId;

        const userRepository = getRepository(User);
        let user: User = await userRepository.findOneOrFail(id);
        if(!user){
            res.status(401).send();
        }

        if (roles.indexOf(user.role) > -1) next();
        else res.status(401).send();
    };
}