import 'reflect-metadata';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { createConnection } from 'typeorm';

import { PORT } from './environments';
import routes from './routes';

let database
process.env.NODE_ENV="production" ? database="production" : database = "default"

createConnection(database)
    .then(async connection => {
        // Create express instance
        const app = express();

        // Enable middlewares
        app.use(cors());
        app.use(helmet());
        app.use(bodyParser.json());

        // Redirect routes
        app.use("/", routes);

        // Listen ports
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch(error => console.log(error));