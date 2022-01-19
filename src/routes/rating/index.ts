import { Router } from 'express';
const router = Router();
import { addRating, getUserRating } from './controller';

router.route('/user-rating').get(getUserRating);
router.route('/:movieId').post(addRating);

export default router;
