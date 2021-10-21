import { NextFunction, Request, Response, Router } from 'express';
export type Action = (req: Request, res: Response, next: NextFunction) => void | Promise<void>;
export abstract class BaseController {
  protected router = Router();
  protected base: string;
  constructor() {}
  abstract bindings(): void;

  getRouter(): Router {
    return this.router;
  }
}
