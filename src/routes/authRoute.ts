import { Router } from 'express';
import { AuthController } from '../controllers/authController';

export class AuthRoute {
  private router = Router();
  private controller: AuthController;

  constructor() {
    this.init();
    this.setupControllers();
  }

  init() {
    this.controller = new AuthController();
  }

  setupControllers() {
   this.router.route('/signup')
    .post(this.controller.signup)

    this.router.route('/signin')
    .post(this.controller.singin)
  }

  getRoutes(): Router {
    return this.router;
  }
}

export default AuthRoute;
