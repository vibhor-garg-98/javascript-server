import { Router } from 'express';
import TraineeController from './Controller';
import  validationHandler  from '../../libs/routes/validationHandler';
import validation from './validation' ;
import authMiddleWare from '../../libs/routes/authMiddleWare';

const TraineeRouter = Router();

TraineeRouter.route('/trainee')
    .get(authMiddleWare('getUsers','read' ) ,validationHandler(validation.get), TraineeController.list)
    .post(authMiddleWare('getUsers','read' ) ,validationHandler(validation.create), TraineeController.create)
    .put(authMiddleWare('getUsers','read' ) ,validationHandler(validation.update), TraineeController.update)
    .delete(authMiddleWare('getUsers','read' ) ,validationHandler(validation.delete), TraineeController.delete);
    TraineeRouter.delete('/trainee/:id', validationHandler(validation.delete), TraineeController.delete);
export default TraineeRouter;