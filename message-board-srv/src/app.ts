import express from 'express';
import cors from 'cors';
import http, { Server } from 'http';
import { Server as IOServer } from 'socket.io';
import { BaseController } from './share';
import { PushService } from './services';
export class App {
  public app: express.Application;
  public server: Server;
  public port: string | number;
  public env: string;

  constructor(controllers: BaseController[]) {
    this.app = express();
    this.server = http.createServer(this.app);
    PushService.getInstance().use(new IOServer(this.server, { cors: { origin: '*' } }));
    this.port = process.env.PORT || 3002;
    this.env = process.env.NODE_ENV || 'development';

    this.initializeMiddlewares();
    this.initializeRoutes(controllers);
  }
  initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  initializeRoutes(controllers: BaseController[]) {
    controllers.forEach(controller => {
      controller.bindings();
      this.app.use('/', controller.getRouter());
    });
  }
  public listen() {
    this.server.listen(this.port, () => {
      console.info(`🚀 App listening on the port ${this.port}`);
    });
  }
}
