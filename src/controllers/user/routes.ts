import { Router } from 'express';
import  UserController from './Controller';
import  validationHandler  from '../../libs/routes/validationHandler';
import validation from './validation' ;
import authMiddleWare from '../../libs/routes/ authMiddleWare';

const userRouter = Router();

userRouter.route('/user')
    .get(authMiddleWare('getUsers','read' ) ,validationHandler(validation.get), UserController.list)
    .post(authMiddleWare('getUsers','read' ) , validationHandler(validation.create),UserController.create)
    .put(authMiddleWare('getUsers','read' ) ,validationHandler(validation.update), UserController.update)
    .delete(authMiddleWare('getUsers','read' ) ,validationHandler(validation.delete), UserController.delete);
    userRouter.delete('/user/:id', validationHandler(validation.delete), UserController.delete);

export default userRouter;