import { Router } from 'express';
const router = Router();
import { getProfile } from './controller';

router.route('/profile').get(getProfile);

export default router;
