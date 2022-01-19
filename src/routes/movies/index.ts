import { Router } from 'express';
const router = Router();
import { getAllMovies, getSingleMovie } from './controller';

router.route('/').get(getAllMovies);
router.route('/:movieId').get(getSingleMovie);

export default router;
