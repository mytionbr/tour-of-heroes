"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroRoute = void 0;
const express_1 = require("express");
const heroController_1 = require("../controllers/heroController");
class HeroRoute {
    constructor() {
        this.route = (0, express_1.Router)();
        this.init();
        this.setupControllers();
    }
    init() {
        this.controller = new heroController_1.HeroController();
    }
    setupControllers() {
        this.route.get('/', this.controller.getAll);
    }
    getRoutes() {
        return this.route;
    }
}
exports.HeroRoute = HeroRoute;
exports.default = HeroRoute;
//# sourceMappingURL=heroRoute.js.map