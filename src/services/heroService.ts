import { Hero } from "../entity/Hero"
import { HeroRepository } from "../repositories/heroRepository"

const heroRepository = new HeroRepository()

export class HeroService {

    async getAll():Promise<Hero[]>{
        return  await heroRepository.getAll()
    }
}