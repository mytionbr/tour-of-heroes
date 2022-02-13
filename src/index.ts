import { Server } from "./server"
import config from './config'

const { port } = config;

(async ():Promise<void>=>{
    try {
        const server = new Server(port);
        await server.init();
        server.start();
    } catch (error) {
        console.log(error)
    }
})()