import * as express from 'express';
import Iconfig from './config/IConfig';
import * as bodyParser from 'body-parser';
import errorHandler from './libs/routes/errorHandler';
import notFoundRoutes from './libs/routes/notFoundRoute';
import { Request } from 'express';
import routes from './controllers/trainee/routes';
import * as mongoose from 'mongoose';
import Database from './libs/Database';

interface User {
  name: string;
  id: string;
}

interface NewRequest extends Request {
  user: User;
}

class Server {
  private app: express.Express;

  constructor(private config: Iconfig) {
    this.app = express();
  }

  bootstrap = (): Server => {
    console.log('Inside Bootstrap');
    this.initBodyParser();
    this.setupRoutes();
    return this;
  };

  initBodyParser = (): void => {
    const { app } = this;

    console.log('Inside initBodyParser');

    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(bodyParser.json());
  };

  run = (): void => {
    const { app, config: { port, mongoDBUri } } = this;
    Database.open(mongoDBUri).then(()=>{
      this.app.listen(this.config.port, (err) => {
        if (err) {
          console.log('error');
          throw err;
        }
        console.log('App is running successfully on port ' + port);
        Database.disconnect();
      });
    })
    
  };

  setupRoutes = (): Server => {
    const { app } = this;

    this.app.get(
      '/health-check',
      (req: express.Request, res: express.Response) => {
        console.log('Inside health check');
        res.send('I am OK');
      }
    );

    app.use('/body-parser', (req: NewRequest, res: any, next: any) => {
      console.log('Inside Middleware');
      req.user = {
        id: '1',
        name: 'Node'
      };
      console.log(req.user);
      res.send('ok');
    });

    app.use('/api', routes);

    app.use(notFoundRoutes);
    app.use(errorHandler);
    return this;
  };
}
export default Server;
