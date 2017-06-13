import express		from 'express';
import userRoutes 	from './routes/user';
import usersRoutes 	from './routes/users';

const router = express.Router();

router.get('/health-check', (_, res) => res.send('OK'));

router.use('/users', usersRoutes);
router.use('/user', userRoutes);

export default router;
