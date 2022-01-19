import { Router } from 'express';
const router = Router();
import { privateRoom, createGroupRoom, getMessageHistory, getAllRooms } from './controller';

router.route('/').get(getAllRooms);
router.route('/private-room').post(privateRoom);
router.route('/message-history/:roomId').get(getMessageHistory);
router.route('/group-room').post(createGroupRoom);

export default router;
