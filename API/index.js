import express		from 'express';
import {router1, router2} from './routes/user';
const router = express.Router();

router.get('/health-check', (_, res) => res.send('OK'));

router.use('/user', router1);
router.use('/users', router2);

export default router;
