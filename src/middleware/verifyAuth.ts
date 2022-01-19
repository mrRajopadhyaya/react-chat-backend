import firebase from '../config/firebase';
import { Request, Response, NextFunction } from 'express';
import User from '../model/User';

const verifyAuth = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const {
    headers: { authorization },
  } = request as any;
  try {
    if (authorization) {
      const result = await firebase.auth().verifyIdToken(authorization);
      const currentUser = await User.find({ email: result.email }).lean();
      request['currentUser'] = currentUser[0];
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    response.status(403).send('Unauthorized');
  }
};

export default verifyAuth;
