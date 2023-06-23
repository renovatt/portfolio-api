import 'express-async-errors';
import express from 'express';
import { router } from './routers';
import { errorHandlerMiddleware } from './middlewares/errosHandler';

const server = express();

server.use(express.json());
server.use(router);
server.use(errorHandlerMiddleware);

server.listen(process.env.PORT || 5000, () => console.log('server listening on port 3333'));