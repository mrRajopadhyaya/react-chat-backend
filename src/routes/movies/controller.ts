import { Request, Response } from 'express';
import Movie from '../../model/Movie';
import { handleError, handleSuccess } from '../../utils/handleResponse';

export const getAllMovies = async (request: Request, response: Response) => {
  const {
    params: { page = 1, size = 5 },
  } = request;
  const query = { 'imdb.rating': { $gte: 8 }, poster: { $ne: null } };
  const movies: any = await Movie.find(query)
    .limit(+size * 1)
    .skip((+page - 1) * +size)
    .lean()
    .catch((err) => handleError(response, err));

  return handleSuccess(response, movies);
};

export const getSingleMovie = async (request: Request, response: Response) => {
  const {
    params: { movieId },
  } = request;

  const movie = await Movie.findOne({ _id: movieId })
    .lean()
    .catch((err) => handleError(response, err));

  return handleSuccess(response, movie);
};
