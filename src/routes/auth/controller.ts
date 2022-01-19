import { Request, Response } from 'express';
import User from '../../model/User';
import { handleError, handleSuccess } from '../../utils/handleResponse';

export const login = async (request: Request, response: Response) => {
  const { body } = request;
  const user: any = await User.find({ email: body.email }).catch((err) =>
    handleError(response, err)
  );
  let responseData = { ...user[0]?.toObject() };
  if (!user.length) {
    const createdUser = await signUp(body);
    responseData = { ...createdUser };
  }
  return handleSuccess(response, responseData);
};

export const signUp = async (userDetails) => {
  const createdUser = await User.create({ ...userDetails }).catch((err) => err);
  return createdUser.toObject();
};
