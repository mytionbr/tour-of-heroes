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

export const heroValidator = (hero: Hero | HeroDTO) => {
  const errors: HeroErrors = {};

  const nameError = heroNameError(hero.name);

  if (nameError) {
    errors.name = nameError;
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
