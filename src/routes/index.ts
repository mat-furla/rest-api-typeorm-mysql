import { Request, Response, Router } from 'express';

import auth from './auth';
import employee from './employee';
import key from './key';
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
            '/key': ['get'],
            '/key:id': ['get', 'patch', 'post'],
            '/user': ['get'],
            '/user/:id': ['get', 'patch', 'delete'],
        }
    })
});

routes.use('/auth', auth);
routes.use('/employee', employee);
routes.use('/key', key);
routes.use('/user', user);

export default routes;