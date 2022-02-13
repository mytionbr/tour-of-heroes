import bodyParser = require('body-parser');
import * as express from 'express'
import { Application } from 'express';
import * as http from 'http'
import * as cors from 'cors'
import * as database from './database'
import heroRoute, { HeroRoute } from './routes/heroRoute';

export class Server {
    private server?: http.Server;
    private app: Application = express();
    private database = database;

    constructor(private port = 3000) { }

    public async init(): Promise<void> {
        this.setupExpress();
        await this.setupDatabase();
        await this.setupRoutes();
    }

    private setupRoutes(): void{
        const rootURL = "/api"

        const heroRoutes = new HeroRoute().getRoutes();

        this.app.use(rootURL + '/heroes', heroRoutes);
    }

    private setupExpress(): void {
        this.app.use(bodyParser.json());
        this.app.use(cors({ origin: '*' }));
    }

    private async setupDatabase(): Promise<void> {
        await this.database.connect();
    }

    public start(): void {
        this.server = this.app.listen(this.port, ()=>{
            console.log('Server listening on port ' + this.port)
        })
    }

    public async close(): Promise<void> {
        await this.database.close();
        if(this.server){
           await this.server.close()
        }
    }

    public getApp(): Application{
        return this.app
    }

    
}