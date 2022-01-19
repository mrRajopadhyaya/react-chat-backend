import { Router } from 'express';
const router = Router();
import { login } from './controller';

router.route('/login').post(login);

export default router;
