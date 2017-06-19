import express from 'express';
import userController from './../controllers/user';

const router1 = express.Router();
const router2 = express.Router();

router1.route('/:id')
  .put(userController.update);

router1.route('/:id')
  .get(userController.getById);

router2.route('/')
  .post(userController.create);

router2.route('/')
  .get(userController.getAll);

export {router1, router2};
