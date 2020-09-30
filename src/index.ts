import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";

createConnection()
    .then(async connection => {
        // Create express instance
        const app = express();

        // Enable middlewares
        app.use(cors());
        app.use(bodyParser.json());

        // Redirect routes
        app.use("/", routes);

        // Listen ports
        app.listen(3000, () => {
            console.log("Server started on port 3000");
        });
    })
    .catch(error => console.log(error));