import { Router } from 'express';
const router = Router();
import { getExpenseByCategory, getExpenseByDate } from './controller';

router.route('/by-category').get(getExpenseByCategory);
router.route('/by-date').get(getExpenseByDate);

export default router;
