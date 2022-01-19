import { Express } from 'express';
import verifyAuth from '../middleware/verifyAuth';
import AuthRoutes from './auth';
import UserRoutes from './user';
import FriendRoutes from './friends';
import RoomRoutes from './room';

const BASE_PATH = '/api';

const routes = (app: Express) => {
  app.use(`${BASE_PATH}/auth`, AuthRoutes);
  app.use(`${BASE_PATH}/user`, verifyAuth, UserRoutes);
  app.use(`${BASE_PATH}/room`, verifyAuth, RoomRoutes);
  app.use(`${BASE_PATH}/friends`, verifyAuth, FriendRoutes);
};

export default routes;
