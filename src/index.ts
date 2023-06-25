import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { router } from './routers';
import { errorHandlerMiddleware } from './middlewares/errosHandler';
import express, { NextFunction, Request, Response } from 'express';

dotenv.config();

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

const server = express();

server.use((
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('Cors middleware accessed');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    server.use(cors());
    next();
});

server.use(express.json());
server.use(router);
server.use(errorHandlerMiddleware);

mongoose
    .connect(DATABASE_URL as string)
    .then(() => {
        console.log('Connection to MongoDB successfully established!');
        server.listen(
            {
                port: PORT,
                host: '0.0.0.0',
            },
            () => {
                console.log(`HTTP server running on http://localhost: ${PORT} 🚀`);
            },
        );
    });