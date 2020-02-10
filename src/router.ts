import { Router } from 'express';
import traineeRouter from './controllers/trainee/routes';
import userRouter from './controllers/user/routes';

const mainRouter = Router();

mainRouter.use('/', traineeRouter);
mainRouter.use('/', userRouter);


export default mainRouter;