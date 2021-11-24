import { createServer } from 'http';
import { Server } from 'socket.io';

import { getConfig } from '../lib/config';
import { logger } from '../lib/logger';

let httpServer;
let io;

export const socket = {
  createServer: () => {
    httpServer = createServer((req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.end(JSON.stringify({ service: 'ws' }));
    });
    httpServer.listen(getConfig().webSocketPort);
  
    io = new Server(httpServer, {
      cors: { origin: '*' },
    });
  
    return this;
  },

  on: () => {
    io.on('connection', (socket) => {
      socket.on('addInRoom', (room) => {
        logger.info(`User join [${room}] room`);
        socket.join(room);
      });
    });
  },

  getIo: () => {
    return io;
  }
};

