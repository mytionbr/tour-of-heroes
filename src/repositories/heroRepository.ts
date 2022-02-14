import { Hero } from '../entity/Hero';
import { getRepository, Repository } from 'typeorm';
import { HeroDTO } from '../dtos/heroDTO';

export class HeroRepository {
  public async getAll(): Promise<Hero[]> {
    const repository = this.getRepository();

    const heroes = await repository.find();

    return heroes;
  }

  public async create(hero: HeroDTO): Promise<Hero> {
    const repository = this.getRepository();

    const createdHero = await repository.create(hero);
    const savedHero = await repository.save(createdHero);

    return savedHero;
  }

  public async findById(heroId: number): Promise<Hero> {
    const repository = this.getRepository();
    
    const hero = await repository.findOne(heroId);
    return hero;
  }

  public async remove(hero: Hero): Promise<void> {
    const repository = this.getRepository();

    await repository.remove(hero);
  }

  private getRepository(): Repository<Hero> {
    return getRepository(Hero);
  }
}
