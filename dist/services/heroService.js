"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroService = void 0;
const heroRepository_1 = require("../repositories/heroRepository");
const heroRepository = new heroRepository_1.HeroRepository();
class HeroService {
    async getAll() {
        return await heroRepository.getAll();
    }
}
exports.HeroService = HeroService;
//# sourceMappingURL=heroService.js.map