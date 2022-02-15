"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroRepository = void 0;
const Hero_1 = require("../entity/Hero");
const typeorm_1 = require("typeorm");
class HeroRepository {
    async getAll() {
        const repository = this.getRepository();
        const heroes = await repository.find();
        return heroes;
    }
    async create(hero) {
        const repository = this.getRepository();
        const createdHero = await repository.create(hero);
        const savedHero = await repository.save(createdHero);
        return savedHero;
    }
    async findById(heroId) {
        const repository = this.getRepository();
        const hero = await repository.findOne(heroId);
        return hero;
    }
    async remove(hero) {
        const repository = this.getRepository();
        await repository.remove(hero);
    }
    async update(id, hero) {
        const repository = this.getRepository();
        await repository.update(id, hero);
    }
    async findByName(name) {
        const repository = this.getRepository();
        const heroes = await repository.find({ name: (0, typeorm_1.ILike)(`%${name}%`) });
        return heroes;
    }
    getRepository() {
        return (0, typeorm_1.getRepository)(Hero_1.Hero);
    }
}
exports.HeroRepository = HeroRepository;
//# sourceMappingURL=heroRepository.js.map