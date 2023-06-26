import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { router } from './routers';
import { MethodNotAllowedError } from './errors';
import { errorHandlerMiddleware } from './middlewares/errosHandler';
import express, { NextFunction, Request, Response } from 'express';

dotenv.config();

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

const server = express();

server.use(cors());
server.use((
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.method !== 'GET') {
        const methodNotAllowedError = new MethodNotAllowedError('Método não permitido.');
        return res
            .status(methodNotAllowedError.statusCode)
            .json({ error: methodNotAllowedError.message });
    }
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