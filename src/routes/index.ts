import { Request, Response, Router } from 'express';

import auth from './auth';
import employee from './employee'
import user from './user';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        routes: {
            '/': ['get'],
            '/auth/login': ['post'],
            '/auth/register': ['post'],
            '/auth/change-password': ['post'],
            '/employee': ['get', 'post'],
            '/employee/:id': ['get', 'patch', 'delete'],
            '/user': ['get'],
            '/user/:id': ['get', 'patch', 'delete'],
        }
    })
});

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/employee', employee);

export default routes;