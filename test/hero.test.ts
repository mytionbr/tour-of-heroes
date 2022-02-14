import { Server } from "../src/server"
import * as supertest from 'supertest';
import { HeroDTO } from "../src/dtos/heroDTO";
import { HeroService } from "../src/services/heroService";

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
    const heroService = new HeroService();

    describe('GET /api/heroes', ()=>{

        it('Should return an array with success and return 200 status code', async ()=>{
            const response = await testRequest.get('/api/heroes');

            expect(response.statusCode).toEqual(200);
            expect(Array.isArray(response.body)).toBeTruthy()
        })
    })

    describe('POST /api/heroes/', ()=>{
        it('Should create a hero with success and return 201 status code', async ()=>{
            const newHero = {
                name: 'Super test'
            }

            const response = await testRequest
                .post('/api/heroes')
                .send(newHero);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(expect.objectContaining(newHero))
            

            await heroService.remove(response.body);          
        })

        it('Should return validation error when name field is invalid', async()=>{
            const newHero = {
                name: ''
            }
            
            const response = await testRequest
                .post('/api/heroes')
                .send(newHero)

            expect(response.status).toBe(400);
            expect(response.body.message).toEqual(
                 ['O nome do herói não deve estar vazio']
            )
        })
    })

    describe("DELETE api/heroes/:id", ()=>{
        it("Should delete a hero with success and return 200 status code", async ()=>{
            const newHero: HeroDTO = {
                name: 'Hero test'
            }

            const createdHero = await heroService.create(newHero);

            const response = await testRequest
                .delete(`/api/heroes/${createdHero.id}`)
            

            expect(response.status).toBe(200);
            expect(response.body.message).toEqual('Herói removido com sucesso!')            

        })

        it("Should return an error when hero does not exist", async () =>{
            const heroId = 12345;

            const response = await testRequest.delete(`/api/heroes/${heroId}`);
            
            expect(response.status).toBe(404);
            expect(response.body.message).toEqual('Herói não cadastrado');
        })
    })

})