interface HeroErrors {
  name?: string;
}

export const heroNameError = (name: string) => {
  if (!name || name.trim() === '') {
    return 'O nome do herói não deve estar vazio';
  }
};

export const heroValidator = (name: string) => {
  const errors: HeroErrors = {};

  const nameError = heroNameError(name);

  if (nameError) {
    errors.name = nameError;
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
