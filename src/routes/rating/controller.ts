import { Request, Response } from 'express';
import Rating from '../../model/Rating';
import { handleError, handleSuccess } from '../../utils/handleResponse';

export const getUserRating = async (request: Request, response: Response) => {
  const { currentUser } = request as any;
  const ratingList = await Rating.find({ author: currentUser._id }).catch(
    (err) => handleError(response, err)
  );
  return handleSuccess(response, ratingList);
};

export const addRating = async (request: Request, response: Response) => {
  try {
    const {
      params: { movieId },
      currentUser,
      body: { rating },
    } = request as any;
    const ratingDoc = (await Rating.find({
      movie: movieId,
      author: currentUser._id,
    }).lean()) as any;
    let userRating;
    if (ratingDoc.length) {
      userRating = await Rating.findOneAndUpdate(
        { _id: ratingDoc[0]._id },
        { rating },
        { new: true }
      );
    } else {
      userRating = await Rating.create({
        author: currentUser._id,
        movie: movieId,
        rating,
      });
    }
    return handleSuccess(response, userRating);
  } catch (error) {
    console.log(error, '@@error');
    return handleError(response, error);
  }
};
