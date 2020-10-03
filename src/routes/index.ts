import { Request, Response, Router } from 'express';

import auth from './auth';
import user from './user';
import router from './auth';

const routes = Router();

// Example route
routes.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Chaveiro-Smart-API');
});

routes.use('/auth', auth);
routes.use('/user', user);

export default routes;