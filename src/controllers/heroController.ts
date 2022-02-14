import { Request, Response } from 'express';
import { HeroDTO } from '..//dtos/heroDTO';
import { heroValidator } from '..//validators/heroValidator';
import { HeroService } from '../services/heroService';

const heroService = new HeroService();

export class HeroController {
  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const heroes = await heroService.getAll();
      res.status(200).send(heroes);
    } catch (error) {
      res.status(400).send('Something went wrong');
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body;

      const { valid, errors } = heroValidator(name);

      if (!valid) {
        return res.status(400).send({ message: Object.values(errors) });
      }

      const hero: HeroDTO = {
        name: name
      };

      const newHero = await heroService.create(hero);

      res.status(201).send(newHero);
    } catch (error) {
      res.status(400).send({ message: error });
    }
  }
}
