import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { HeroController } from '../controllers/heroController';

export class HeroRoute {
  private router = Router();
  private heroController: HeroController;
  private authController: AuthController;

  constructor() {
    this.init();
    this.setupControllers();
  }

  init() {
    this.heroController = new HeroController();
    this.authController = new AuthController();
  }

  setupControllers() {
    this.router
      .route('/')
      .get(this.heroController.getAll)
      .post(this.heroController.create);

    this.router
      .route('/:heroId')
      .delete(this.heroController.remove)
      .put(this.heroController.update)
      .get(this.authController.isAuth,this.heroController.findById)

    this.router
      .route('/name/:heroName')
      .get(this.heroController.findByName)
  }

  getRoutes(): Router {
    return this.router;
  }
}

export default HeroRoute;
