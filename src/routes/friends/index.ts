import { Router } from 'express';
const router = Router();
import { getFriendsList, getFriendSuggestion } from './controller';

router.route('/').get(getFriendsList);
router.route('/friend-suggestion').get(getFriendSuggestion);
// router.route('/group-room').post(createGroupRoom);

export default router;
