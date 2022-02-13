import { Request, Response } from 'express';
import { HeroService } from '../services/heroService';

const heroService = new HeroService();

export class HeroController {
  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const heroes = await heroService.getAll();
      res.status(200).send(heroes);
    } catch (error) {
      console.log(error);
      res.status(500).send('Something went wrong');
    }
  }
}
