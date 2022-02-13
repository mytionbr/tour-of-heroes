import { Hero } from '../entity/Hero';
import { getRepository, Repository } from 'typeorm';

export class HeroRepository {
  public async getAll(): Promise<Hero[]> {
    const heroRepository = getRepository(Hero);

    const heroes = await heroRepository.find();

    return heroes;
  }
}
