import { Request, Response } from 'express';
import User from '../../model/User';
import { IUser } from '../../model/User';
import { handleError, handleSuccess } from '../../utils/handleResponse';

export const getProfile = async (
  request: Request & { currentUser: IUser },
  response: Response
) => {
  const { currentUser } = request;
  const user: any = await User.findOne({ email: currentUser.email }).catch(
    (err) => handleError(response, err)
  );
  return handleSuccess(response, { profile: user });
};
