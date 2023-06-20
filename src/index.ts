import express from 'express';
import { router } from './routers';

const server = express();

server.use(express.json());
server.use(router);

server.listen(process.env.PORT || 5000, () => console.log('server listening on port 3333'));