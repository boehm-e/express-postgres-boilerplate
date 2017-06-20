import express		from 'express';
import userController	from './../controllers/user';
import RBAC		from './../helpers/access';

const router = express.Router();

router.route('/')
  .post(userController.create);

router.route('/:id')
  .get(userController.getById);

export default router;
