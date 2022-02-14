import { HeroDTO } from '..//dtos/heroDTO';
import { Hero } from '../entity/Hero';
import { HeroRepository } from '../repositories/heroRepository';

const heroRepository = new HeroRepository();

export class HeroService {
  public async getAll(): Promise<Hero[]> {
    return await heroRepository.getAll();
  }

  public async create(hero: HeroDTO): Promise<Hero> {
    return await heroRepository.create(hero);
  }

  public async findById(heroId: number): Promise<Hero>{
    return await heroRepository.findById(heroId);
  }

  public async remove(hero: Hero): Promise<void>{
    await heroRepository.remove(hero);
  }

  public async update(id: number, hero: Hero): Promise<void>{
    await heroRepository.update(id, hero);
  }

  public async findByName(name: string): Promise<Hero[]> {
    const heroes = heroRepository.findByName(name);
    return heroes;
  }
}
