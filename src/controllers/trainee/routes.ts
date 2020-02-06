import { Router } from 'express';
import TraineeController from './Controller';
import  validationHandler  from '../../libs/routes/validationHandler';
import validation from './validation' ;

const TraineeRouter = Router();

TraineeRouter.route('/trainee')
    .get(validationHandler(validation.get), TraineeController.list)
    .post(validationHandler(validation.create), TraineeController.create)
    .put(validationHandler(validation.update), TraineeController.update)
    .delete(validationHandler(validation.delete), TraineeController.delete);
    TraineeRouter.delete('/trainee/:id', validationHandler(validation.delete), TraineeController.delete);
export default TraineeRouter;