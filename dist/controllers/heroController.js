"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroController = void 0;
const heroService_1 = require("../services/heroService");
const heroService = new heroService_1.HeroService();
class HeroController {
    async getAll(req, res) {
        try {
            const heroes = await heroService.getAll();
            res.status(200).send(heroes);
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Something went wrong');
        }
    }
}
exports.HeroController = HeroController;
//# sourceMappingURL=heroController.js.map