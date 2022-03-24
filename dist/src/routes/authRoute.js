"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
class AuthRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.init();
        this.setupControllers();
    }
    init() {
        this.controller = new authController_1.AuthController();
    }
    setupControllers() {
        this.router.route('/signup')
            .post(this.controller.signup);
        this.router.route('/signin')
            .post(this.controller.singin);
    }
    getRoutes() {
        return this.router;
    }
}
exports.AuthRoute = AuthRoute;
exports.default = AuthRoute;
//# sourceMappingURL=authRoute.js.map