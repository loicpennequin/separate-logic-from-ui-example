import dotenv from 'dotenv';
dotenv.config({ path: `.env.local` });

import http from 'http';
import { config } from './config';
import { createApp } from './app';

export type { TrpcRouter } from './trpc';
const app = createApp();
const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log('server ready on port', config.PORT);
});
