import { Server } from "../src/server"
import * as supertest from 'supertest';

const server = new Server();

beforeAll( async () => {
    await server.init();
    server.start();
})

afterAll( async ()=> {
    await server.close();
})

describe('Heroes tests', ()=>{
    const app = server.getApp();
    const testRequest = supertest(app);

    describe('When listing the heroes: GET /api/heroes', ()=>{

        it('Should return an array with success status', async ()=>{
            const response = await testRequest.get('/api/heroes');

            expect(response.statusCode).toEqual(200);
            expect(Array.isArray(response.body)).toBeTruthy()
        })
    })

    describe('When creating a new hero: Post /api/heroes/', ()=>{
        it('Should create a hero with success and return status 201', async ()=>{
            const newHero = {
                name: 'Super test'
            }

            const response = await testRequest
                .post('/api/heroes')
                .send(newHero);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(expect.objectContaining(newHero))
        })

        it('Should return validation error when name field is invalid', async()=>{
            const newHero = {
                name: ''
            }
            
            const response = await testRequest
                .post('/api/heroes')
                .send(newHero)
            
            console.log(response.body)

            expect(response.status).toBe(400);
            expect(response.body.message).toEqual(
                 ['O nome do herói não deve estar vazio']
            )
        })
    })

})