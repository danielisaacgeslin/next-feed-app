import next from 'next';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { WS_PORT, WS_POST_EV } from './constants';
import type { RawApiPost } from './types';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const server = express();

  const httpServer = http.createServer(server);
  const io = new Server(httpServer, { cors: { preflightContinue: true } });

  io.on('connection', () => {
    console.log('Client connected');
  });

  setInterval(() => {
    const post: RawApiPost = {
      id: Math.round(Number(Math.random().toFixed(2)) * 100),
      postId: Math.round(Number(Math.random().toFixed(2)) * 100),
      name: `WS user ${Date.now()}`,
      email: `WS user ${Date.now()}`,
      body: `WS message ${Date.now()}`
    };
    console.log(`emmiting post ${post.id}`);
    io.emit(WS_POST_EV, post);
  }, 5000);

  server.all('*', (req, res) => handle(req, res));

  httpServer.listen(WS_PORT, () => {
    console.log(`Server is running on http://localhost:${WS_PORT}`);
  });
})();
