import { HeroService } from "../services/heroService";
import { HeroDTO } from "../dtos/heroDTO";
import { Hero } from "../entity/Hero";

interface HeroErrors {
  name?: string;
}

export const heroNameError = (name: string) => {
  if (!name || name.trim() === '') {
    return 'O nome do herói não deve estar vazio';
  }
};

export const heroNameAlreadyExistsError = async (name: string) => {
  const heroService = new HeroService();

  const heroes = await heroService.findByName(name);

  if(heroes.length > 0) {
    return 'Já existe um herói com esse nome'
  }
}

export const heroValidator = async (hero: Hero | HeroDTO) => {
  const errors: HeroErrors = {};

  const nameError = heroNameError(hero.name);
  

  if (nameError) {
    errors.name = nameError;
  } else {
    const nameAlreadyExistsError = await heroNameAlreadyExistsError(hero.name);
    if(nameAlreadyExistsError) {
      errors.name = nameAlreadyExistsError
    }
  }
    
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
