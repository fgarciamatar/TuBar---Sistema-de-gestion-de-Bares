import express, {
  Application,
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';
import cors from 'cors';
import db from '../database/db';
import path from 'path';
import AppError from './appError';
// import globalErrorHandler from '../controllers/error.controllers';
import { initModels } from '../database/models';
import { globalErrorHandler } from '../controllers';
import { authRoutes } from '../routes';

class Server {
  private app: Application;
  private PORT: string = process.env.PORT || '4003';
  private HOST: string = process.env.HOST || 'localhost';
  private ROUTE: string = process.env.ROUTE || '/api/v1';
  private rootDir = path.resolve(__dirname, '..');

  constructor() {
    this.app = express();
    this.middlewares();
    this.database();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  database() {
    db.authenticate()
      .then(() => console.log('Database authenticate'))
      .catch(err => console.log(err));
    initModels();
    db.sync({ force: true })
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }
  routes() {
    const router = Router();
    this.app.use(this.ROUTE, router);
    router.use('/auth', authRoutes);
    // router.use('/users', routesUsers);
    // router.use('/countries', routesCountries);
    // router.use('/states', routesStates);
    // router.use('/publications-types', routespublicationsTypes);
    // router.use('/roles', routesRoles);
    // router.use('/cities', routesCities);
    // router.use('/tags', routesTags);

    this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
      return next(
        new AppError(`can't find ${req.originalUrl} on this server`, 404)
      );
    });
    // this.app.use('/', (req: Request, res: Response) => {
    //   res.json({
    //     status: true,
    //     server: 'OK',
    //   });
    // });
    this.app.use(globalErrorHandler);
  }
  listen() {
    this.app.listen(this.PORT, () => {
      const server = `http://${this.HOST}:${this.PORT}`;
      console.log(`🚀 Server deployed at: ${server}`);
    });
  }
}

export default Server;
