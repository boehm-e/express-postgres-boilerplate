import express		from 'express';
import userRoutes 	from './routes/user';

const router = express.Router();

router.get('/health-check', (_, res) => res.send('OK'));

router.use('/users', userRoutes);

export default router;
