"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroRoute = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const heroController_1 = require("../controllers/heroController");
class HeroRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.init();
        this.setupControllers();
    }
    init() {
        this.heroController = new heroController_1.HeroController();
        this.authController = new authController_1.AuthController();
    }
    setupControllers() {
        this.router
            .route('/')
            .get(this.heroController.getAll)
            .post(this.authController.isAuth, this.heroController.create);
        this.router
            .route('/:heroId')
            .delete(this.authController.isAuth, this.heroController.remove)
            .put(this.authController.isAuth, this.heroController.update)
            .get(this.heroController.findById);
        this.router
            .route('/name/:heroName')
            .get(this.heroController.findByName);
        this.router
            .route('/user/:id')
            .get(this.authController.isAuth, this.heroController.findByUser);
    }
    getRoutes() {
        return this.router;
    }
}
exports.HeroRoute = HeroRoute;
exports.default = HeroRoute;
//# sourceMappingURL=heroRoute.js.map