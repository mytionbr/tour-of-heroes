import { Categories } from '../enum/Categories';
import { HeroDTO } from '../dtos/heroDTO';
import { Hero } from '../entity/Hero';
import { HeroRepository } from '../repositories/heroRepository';
import { hasItem } from '../utils/hasItem';

const heroRepository = new HeroRepository();

export class HeroService {

  public async get(category?: string): Promise<Hero[]> {
    if(category){
      const categoryExists = hasItem(category, Object.values(Categories));

      if(!categoryExists){
        throw new Error('A categoria fornecida não existe')
      }
    }

    return await heroRepository.get(category);
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
    const heroes = await heroRepository.findByName(name);
    return heroes;
  }

  public async findByUser(id: number): Promise<Hero[]> {
    const heroes = await heroRepository.findByUser(id);
    return heroes;
  }

  public getCategories(): string[] {
    const categories = Object.values(Categories) as string[];
    return categories;
  }
}
