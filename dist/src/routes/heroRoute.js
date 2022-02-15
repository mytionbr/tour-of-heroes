"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroRoute = void 0;
const express_1 = require("express");
const heroController_1 = require("../controllers/heroController");
class HeroRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.init();
        this.setupControllers();
    }
    init() {
        this.controller = new heroController_1.HeroController();
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
            .get(this.controller.findById);
        this.router
            .route('/name/:heroName')
            .get(this.controller.findByName);
    }
    getRoutes() {
        return this.router;
    }
}
exports.HeroRoute = HeroRoute;
exports.default = HeroRoute;
//# sourceMappingURL=heroRoute.js.map