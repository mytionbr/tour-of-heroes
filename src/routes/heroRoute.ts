import { Router } from 'express';
import { HeroController } from '../controllers/heroController';

export class HeroRoute {
  private router = Router();
  private controller: HeroController;

  constructor() {
    this.init();
    this.setupControllers();
  }

  init() {
    this.controller = new HeroController();
  }

  setupControllers() {
    this.router
      .route('/')
      .get(this.controller.getAll)
      .post(this.controller.create);

    this.router
      .route('/:heroId')
      .delete(this.controller.remove)
      .put(this.controller.update)
      .get(this.controller.findById)

    this.router
      .route('/name/:heroName')
      .get(this.controller.findByName)
  }

  getRoutes(): Router {
    return this.router;
  }
}

export default HeroRoute;
