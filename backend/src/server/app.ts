import express, { json, NextFunction, Request, Response } from 'express';
import {
  buyersRouter,
  cnpjsRouter,
  ordersRouter,
  providersRouter,
  sponsorsRouter,
} from '../routes/index.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.middlewares();
    this.app.use(cnpjsRouter);
    this.app.use(ordersRouter);
    this.app.use(providersRouter);
    this.app.use(buyersRouter);
    this.app.use(sponsorsRouter);
    this.app.get('/', (_req, res) => res.send('Hello, world!'));
  }

  private config = (): void => {
    const accessControl: express.RequestHandler = (_req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT, PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(json());
  };

  public middlewares = () => {
    this.app.use(json());
  };

  public listen = (port: number) => {
    this.app.listen(port, () => console.log(`Server running at port ${port}`));
  };
}

export default new App();