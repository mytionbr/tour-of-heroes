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

    return createdHero;
  }

  private getRepository(): Repository<Hero> {
    return getRepository(Hero);
  }
}
