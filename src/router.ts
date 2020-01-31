import { Router } from 'express';
import traineeRouter from './controllers/trainee/routes';

const mainRouter = Router();

mainRouter.use('/', traineeRouter);

export default mainRouter;