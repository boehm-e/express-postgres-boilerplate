import express from 'express';
import userController from './../controllers/user';

const router = express.Router();

router.route('/')
  .post(userController.create);

router.route('/')
  .get(userController.getAll);

  
export default router;
