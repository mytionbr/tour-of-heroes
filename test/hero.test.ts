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

    describe('When listing the heroes: GET /api/heroes', ()=>{
        const app = server.getApp()

        it('Should return an array with status success', async ()=>{
            const response = await supertest(app).get('/api/heroes');

            expect(response.statusCode).toEqual(200);
            expect(Array.isArray(response.body)).toBeTruthy()
        })
    })

})