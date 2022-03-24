"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../src/server");
const supertest = require("supertest");
const heroService_1 = require("../src/services/heroService");
const server = new server_1.Server();
beforeAll(async () => {
    await server.init();
    server.start();
});
afterAll(async () => {
    await server.close();
});
describe('Heroes tests', () => {
    const app = server.getApp();
    const testRequest = supertest(app);
    const heroService = new heroService_1.HeroService();
    describe('GET /api/heroes', () => {
        it('Should return an array with success and return 200 status code', async () => {
            const response = await testRequest.get('/api/heroes');
            expect(response.statusCode).toEqual(200);
            expect(Array.isArray(response.body)).toBeTruthy();
        });
    });
    describe('GET /api/heroes/:id', () => {
        it('Should return target hero', async () => {
            const hero = await heroService.create({ name: 'Fulano de tal' });
            const response = await testRequest.get(`/api/heroes/${hero.id}`);
            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual(expect.objectContaining(hero));
            await heroService.remove(hero);
        });
        it('Should return error when hero not found', async () => {
            const heroId = 232323;
            const response = await testRequest.get(`/api/heroes/${heroId}`);
            expect(response.statusCode).toEqual(400);
            expect(response.body.message).toEqual('Herói não encontrado');
        });
    });
    describe('GET /api/heroes/name/:heroName', () => {
        it('Should return an array of heroes with the searched name', async () => {
            const hero1 = await heroService.create({ name: 'Fulano' });
            const hero2 = await heroService.create({ name: 'Fulano de tal' });
            const hero3 = await heroService.create({ name: 'Test' });
            const response = await testRequest.get(`/api/heroes/name/fulano`);
            expect(response.status).toEqual(200);
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(2);
            await heroService.remove(hero1);
            await heroService.remove(hero2);
            await heroService.remove(hero3);
        });
        it('Should return an empty array of heroes with the searched name', async () => {
            const hero1 = await heroService.create({ name: 'Fulano' });
            const hero2 = await heroService.create({ name: 'Fulano de tal' });
            const hero3 = await heroService.create({ name: 'Test' });
            const response = await testRequest.get(`/api/heroes/name/dfsdfsf`);
            expect(response.status).toEqual(200);
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(0);
            await heroService.remove(hero1);
            await heroService.remove(hero2);
            await heroService.remove(hero3);
        });
    });
    describe('POST /api/heroes/', () => {
        it('Should create a hero with success and return 201 status code', async () => {
            const newHero = {
                name: 'Super test'
            };
            const response = await testRequest
                .post('/api/heroes')
                .send(newHero);
            expect(response.status).toBe(201);
            expect(response.body).toEqual(expect.objectContaining(newHero));
            await heroService.remove(response.body);
        });
        it('Should return a validation error when name field is invalid', async () => {
            const newHero = {
                name: ''
            };
            const response = await testRequest
                .post('/api/heroes')
                .send(newHero);
            expect(response.status).toBe(400);
            expect(response.body.message).toEqual(['O nome do herói não deve estar vazio']);
        });
    });
    describe("DELETE api/heroes/:id", () => {
        it("Should delete a hero with success and return 200 status code", async () => {
            const newHero = {
                name: 'Hero test'
            };
            const createdHero = await heroService.create(newHero);
            const response = await testRequest
                .delete(`/api/heroes/${createdHero.id}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toEqual('Herói removido com sucesso!');
        });
        it("Should return an error when hero does not exist", async () => {
            const heroId = 12345;
            const response = await testRequest.delete(`/api/heroes/${heroId}`);
            expect(response.status).toBe(404);
            expect(response.body.message).toEqual('Herói não cadastrado');
        });
    });
    describe("PUT /api/heroes/:id", () => {
        it("Should update a hero and return 200 status code", async () => {
            const hero = await heroService.create({ name: "Fulano de tal" });
            hero.name = "Fulano";
            const response = await testRequest
                .put(`/api/heroes/${hero.id}`)
                .send(hero);
            expect(response.status).toBe(200);
            expect(response.body.message)
                .toBe('Herói atualizado com sucesso!');
            await heroService.remove(hero);
        });
        it("Should return validation error when name field is invalid", async () => {
            const hero = await heroService.create({ name: "Fulano de tal" });
            hero.name = "";
            const response = await testRequest
                .put(`/api/heroes/${hero.id}`)
                .send(hero);
            expect(response.status).toBe(400);
            expect(response.body.message).toEqual(['O nome do herói não deve estar vazio']);
            await heroService.remove(hero);
        });
    });
});
//# sourceMappingURL=hero.test.js.map