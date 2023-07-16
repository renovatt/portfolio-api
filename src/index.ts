import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './routers';
import { auth } from './middlewares/auth';
import { errorHandlerMiddleware } from './middlewares/errosHandler';

dotenv.config();

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

const server = express();

server.use(cors());
server.use(express.json());
server.use(auth());
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