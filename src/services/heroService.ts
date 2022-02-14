import { HeroDTO } from '..//dtos/heroDTO';
import { Hero } from '../entity/Hero';
import { HeroRepository } from '../repositories/heroRepository';

const heroRepository = new HeroRepository();

export class HeroService {
  public async getAll(): Promise<Hero[]> {
    return await heroRepository.getAll();
  }

  public async create(hero: HeroDTO): Promise<Hero> {
    const createdHero = await heroRepository.create(hero);
    return createdHero;
  }
}
