import { Server } from "../src/server"
const server = new Server();

beforeAll( async () => {
    await server.init();
    server.start();
})

afterAll( async ()=> {
    await server.close();
})

describe('Heroes tests', ()=>{

    describe('When listing the heroes', ()=>{
        it('Should return a array with status success', async ()=>{

        })
    })

})