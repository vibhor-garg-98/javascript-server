import * as express from 'express';

class Server {
  private app: express.Express;

  constructor(private config) {
    this.app = express();
  }

  bootstrap = () => {
    console.log('Inside bootsrap');
    this.setupRoutes();
    return this;
  };
  run = () => {
    const {
      app,
      config: { port }
    } = this;

    app.listen(port, err => {
      if (err) {
        throw err;
      }
      console.log('App is running successfully on port ' + port);
    });
  };

  setupRoutes = () => {
    const { app } = this;

    app.get('/health-check', (req, res) => {
      console.log("Inside health check");
      res.send('i am ok');
    });
    return this;
  };
}

export default Server;
