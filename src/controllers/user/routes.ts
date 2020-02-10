import { Router } from 'express';
import  UserController from './Controller';
import  validationHandler  from '../../libs/routes/validationHandler';
import validation from './validation' ;
import authMiddleWare from '../../libs/routes/ authMiddleWare';
import IRequest from '../../libs/routes/IRequest';

const userRouter = Router();

userRouter.route('/')
    .get(authMiddleWare('getUsers','read' ) ,validationHandler(validation.get), UserController.list)
    .post( validationHandler(validation.create),UserController.create)
    .put(authMiddleWare('getUsers','read' ) ,validationHandler(validation.update), UserController.update)
    .delete(authMiddleWare('getUsers','read' ) ,validationHandler(validation.delete), UserController.delete);
    userRouter.delete('/user/:id', validationHandler(validation.delete), UserController.delete);

    userRouter.route('/me')
    .get(authMiddleWare('getUsers','read' ),(req: IRequest,res)=>{

        console.log('Inside routes',req.user)
        res.send(req.user)
    })
export default userRouter;