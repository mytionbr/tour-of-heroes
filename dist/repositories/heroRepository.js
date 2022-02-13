"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroRepository = void 0;
const Hero_1 = require("../entity/Hero");
const typeorm_1 = require("typeorm");
class HeroRepository {
    async getAll() {
        const heroRepository = (0, typeorm_1.getRepository)(Hero_1.Hero);
        const heroes = await heroRepository.find();
        return heroes;
    }
}
exports.HeroRepository = HeroRepository;
//# sourceMappingURL=heroRepository.js.map