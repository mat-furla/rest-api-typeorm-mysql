import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_ACCESS_SECRET } from '../environments';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers["auth"];
    let jwtPayload;

    try {
        jwtPayload = <any>jwt.verify(token, JWT_ACCESS_SECRET);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        res.status(401).send();
        return;
    }

    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, JWT_ACCESS_SECRET, {
        expiresIn: "1h"
    });
    res.setHeader("token", newToken);

    next();
};
