import express from 'express';
import userController from './../controllers/user';

const usersRoutes = express.Router();

usersRoutes.route('/:id')
    .get(userController.getById)
    .put(userController.updateById);
    // .delete(userController.deleteById);


usersRoutes.route('/')
    .get(userController.getAll)
    .post(userController.create);
    // .put(userController.update)
    // .delete(userController.delete);


export default usersRoutes;
