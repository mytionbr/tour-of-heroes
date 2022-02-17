"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroController = void 0;
const heroValidator_1 = require("../validators/heroValidator");
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
            res.status(500).send('Algo deu errado');
        }
    }
    async create(req, res) {
        try {
            const { name } = req.body;
            const hero = {
                name: name
            };
            const { valid, errors } = await (0, heroValidator_1.heroValidator)(hero);
            if (!valid) {
                return res.status(400).send({ message: Object.values(errors) });
            }
            const newHero = await heroService.create(hero);
            res.status(201).send(newHero);
        }
        catch (error) {
            res.status(500).send({ message: 'Algo deu errado' });
        }
    }
    async remove(req, res) {
        try {
            const heroId = Number(req.params.heroId);
            const heroToRemove = await heroService.findById(heroId);
            if (!heroToRemove) {
                return res.status(404).send({ message: 'Herói não cadastrado' });
            }
            await heroService.remove(heroToRemove);
            res.status(200).send({ message: 'Herói removido com sucesso!' });
        }
        catch (error) {
            res.status(500).send({ message: 'Algo deu errado' });
        }
    }
    async update(req, res) {
        try {
            const heroId = Number(req.params.heroId);
            const heroToUpdate = req.body;
            const { valid, errors } = await (0, heroValidator_1.heroValidator)(heroToUpdate);
            if (!valid) {
                return res.status(400).send({ message: Object.values(errors) });
            }
            await heroService.update(heroId, heroToUpdate);
            res.status(200).send({
                message: 'Herói atualizado com sucesso!'
            });
        }
        catch (error) {
            res.status(500).send({
                message: 'Algo deu errado'
            });
        }
    }
    async findById(req, res) {
        try {
            const heroId = Number(req.params.heroId);
            const hero = await heroService.findById(heroId);
            if (!hero) {
                return res.status(400).send({ message: 'Herói não encontrado' });
            }
            res.status(200).send(hero);
        }
        catch (error) {
            res.status(500).send({ message: 'Algo deu errado' });
        }
    }
    async findByName(req, res) {
        try {
            const heroName = req.params.heroName;
            const heroes = await heroService.findByName(heroName);
            res.status(200).send(heroes);
        }
        catch (error) {
            res.status(500).send({ message: 'Algo deu errado' });
        }
    }
}
exports.HeroController = HeroController;
//# sourceMappingURL=heroController.js.map