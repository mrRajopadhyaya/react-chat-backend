import express, { Express } from 'express';
import http from 'http';
import morgan from 'morgan';
import mongooseInstance from './config/mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './routes';
import { Server } from 'socket.io';
import SocketController from './routes/socket';
import loading from 'loading-cli';
// import './config/firebase';
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app: Express = express();
const server = http.createServer(app);

export const IO: Server = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

SocketController(IO);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
routes(app);

server.listen(PORT, async () => {
  try {
    console.log(`Server has started on port ${PORT}`);
    const load = loading('Establishing connection to database server');
    load.start();
    load.color = 'green';
    await mongooseInstance();
    load.succeed('Successfully connected to database server');
  } catch (error) {
    console.log('Error: Could not connect to database server', error);
  }
});
