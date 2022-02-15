"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroService = void 0;
const heroRepository_1 = require("../repositories/heroRepository");
const heroRepository = new heroRepository_1.HeroRepository();
class HeroService {
    async getAll() {
        return await heroRepository.getAll();
    }
    async create(hero) {
        return await heroRepository.create(hero);
    }
    async findById(heroId) {
        return await heroRepository.findById(heroId);
    }
    async remove(hero) {
        await heroRepository.remove(hero);
    }
    async update(id, hero) {
        await heroRepository.update(id, hero);
    }
    async findByName(name) {
        const heroes = heroRepository.findByName(name);
        return heroes;
    }
}
exports.HeroService = HeroService;
//# sourceMappingURL=heroService.js.map