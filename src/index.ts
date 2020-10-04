import 'reflect-metadata';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { createConnection } from 'typeorm';

import { PORT } from './environments';
import routes from './routes';

const main = async () => {
    let retries = 20;
    while (retries) {
        try {
            await createConnection();
            break;
        } catch (err) {
            console.log(err);
            retries -= 1;
            console.log(`Retries left: ${retries}`)
            await new Promise(res => setTimeout(res, 5000));
        }
    }

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
        console.log(`Server started on http://localhost:${PORT}`);
    });
}

main();