import 'express-async-errors';
import express from 'express';
import { router } from './routers';
import { errorHandlerMiddleware } from './middlewares/errosHandler';

const PORT = process.env.PORT;
const server = express();

server.use(express.json());
server.use(router);
server.use(errorHandlerMiddleware);

server.listen(PORT || 5000, () => console.log(`server listening on port ${PORT}`));