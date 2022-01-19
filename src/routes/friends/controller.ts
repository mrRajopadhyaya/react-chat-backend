import { Request, Response } from 'express';
import User from '../../model/User';
import { handleError, handleSuccess } from '../../utils/handleResponse';

export const getFriendsList = async (request: Request, response: Response) => {
  const { currentUser } = request as any;
  try {
    const friendsList: any = await User.find(
      { _id: currentUser._id },
      { friends: 1 }
    ).populate('friends');
    return handleSuccess(response, { friendsList: friendsList[0].friends });
  } catch (error) {
    return handleError(response, error);
  }
};

export const getFriendSuggestion = async (
  request: Request,
  response: Response
) => {
  const { currentUser } = request as any;
  try {
    const friendsList: any = await User.find(
      { _id: currentUser._id },
      { friends: 1 }
    );
    console.log(`@@@friendsList`, friendsList);
    return handleSuccess(response, { friendsList: friendsList[0].friends });
  } catch (error) {
    return handleError(response, error);
  }
};
