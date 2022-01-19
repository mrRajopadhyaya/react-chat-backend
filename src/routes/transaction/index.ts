import { Router } from 'express';
const router = Router();
import {
  getAllTransaction,
  createTransaction,
  deleteSingleTransaction,
  getTotalData,
} from './controller';

router.route('/:page/:size').get(getAllTransaction);
router.route('/').post(createTransaction);
router.route('/:transactionId').delete(deleteSingleTransaction);
router.route('/total').get(getTotalData);

export default router;
