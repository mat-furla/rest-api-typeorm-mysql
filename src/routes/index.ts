import { Request, Response, Router } from 'express';

import auth from './auth';
import employee from './employee';
import engine from './engine';
import key from './key';
import requisition from './requisition';
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
            '/engine': ['post'],
            '/engine/:id': ['get', 'patch'],
            '/key': ['get'],
            '/key:id': ['get', 'patch'],
            '/requisition': ['get'],
            '/requisition:id': ['get', 'patch', 'post'],
            '/user': ['get'],
            '/user/:id': ['get', 'patch', 'delete'],
        }
    })
});

routes.use('/auth', auth);
routes.use('/employee', employee);
routes.use('/engine', engine);
routes.use('/key', key);
routes.use('/requisition', requisition);
routes.use('/user', user);

export default routes;