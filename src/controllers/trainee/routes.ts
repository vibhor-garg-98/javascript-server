import { Router } from 'express';
import TraineeController from './Controller';

const TraineeRouter = Router();

TraineeRouter.route('/trainee')
    .get(TraineeController.list)
    .post(TraineeController.create)
    .delete(TraineeController.deleted)
    .put(TraineeController.update);

export default traineeRouter;