import { Router } from "express";
import { HeroController } from "../controllers/heroController";


export class HeroRoute {
    private route = Router();
    private controller: HeroController

    constructor(){
        this.init();
        this.setupControllers()
    }

    init(){
        this.controller = new HeroController();
    }

    setupControllers(){
        this.route.get('/', this.controller.getAll)
    }

    getRoutes(): Router{
        return this.route
    }
}

export default HeroRoute