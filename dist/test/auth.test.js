"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supertest = require("supertest");
const server_1 = require("../src/server");
const userService_1 = require("../src/services/userService");
const server = new server_1.Server();
beforeAll(async () => {
    await server.init();
    server.start();
});
afterAll(async () => {
    await server.close();
});
describe('Auth tests', () => {
    const app = server.getApp();
    const testRequest = supertest(app);
    const userService = new userService_1.UserService();
    describe('POST /api/auth', () => {
        it('Should sign up a user with success', async () => {
            const userToSave = {
                email: 'fulano@test.com',
                password: '123456',
                username: 'fulano de tal'
            };
            const response = await testRequest
                .post('/api/auth/signup')
                .send(userToSave);
            expect(response.statusCode).toBe(201);
            expect(response.body.username).toEqual(userToSave.username);
            expect(response.body.token).toBeTruthy();
            await userService.delete(response.body.id);
        });
        it('Should return a validation error when username field is invalid', async () => {
            const userToSave = {
                email: 'fulano@test.com',
                password: '123456',
                username: ''
            };
            const response = await testRequest
                .post('/api/auth/signup')
                .send(userToSave);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toEqual(['O username não deve estar vazio']);
        });
        it('Should return a validation error when password field is invalid', async () => {
            const userToSave = {
                email: 'fulano@test.com',
                password: '123',
                username: 'fulano'
            };
            const response = await testRequest
                .post('/api/auth/signup')
                .send(userToSave);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toEqual(['A senha deve ter pelo menos 6 caracteres']);
        });
        it('Should return a validation error when email field is invalid', async () => {
            const userToSave = {
                email: 'fulanotest.com',
                password: '123456',
                username: 'fulano'
            };
            const response = await testRequest
                .post('/api/auth/signup')
                .send(userToSave);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toEqual(['Email invalido']);
        });
        it('Should return a validation error when the email alredy exists', async () => {
            const user1 = await userService.save({
                email: 'fulanotest@test.com',
                password: '123456',
                username: 'fulano'
            });
            const user2 = {
                email: 'fulanotest@test.com',
                password: '123456',
                username: 'fulano2'
            };
            const response = await testRequest
                .post('/api/auth/signup')
                .send(user2);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toEqual(['Esse email já está cadastrado']);
            await userService.delete(user1.id);
        });
        it('Should return a validation error when the username alredy exists', async () => {
            const user1 = await userService.save({
                email: 'fulanotest@test.com',
                password: '123456',
                username: 'fulano'
            });
            const user2 = {
                email: 'fulanotest1@test.com',
                password: '123456',
                username: 'fulano'
            };
            const response = await testRequest
                .post('/api/auth/signup')
                .send(user2);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toEqual(['Esse username já está cadastrado']);
            await userService.delete(user1.id);
        });
    });
});
//# sourceMappingURL=auth.test.js.map