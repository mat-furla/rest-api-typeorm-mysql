import { Router, Request, Response } from "express";

const routes = Router();

// Example route
routes.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Chaveiro-Smart-API');
});

export default routes;