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
      res.status(500).send('Algo deu errado');
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body;

      const { valid, errors } = await heroValidator(name);

      if (!valid) {
        return res.status(400).send({ message: Object.values(errors) });
      }

      const hero: HeroDTO = {
        name: name
      };

      const newHero = await heroService.create(hero);

      res.status(201).send(newHero);
    } catch (error) {
      res.status(500).send({message: 'Algo deu errado' });
    }
  }

  public async remove(req: Request, res: Response):Promise<Response>{
    try {
      const heroId = Number(req.params.heroId);
      
      const heroToRemove = await heroService.findById(heroId);

      if(!heroToRemove){
        return res.status(404).send({message: 'Herói não cadastrado'})
      }

      await heroService.remove(heroToRemove);

      res.status(200).send({message: 'Herói removido com sucesso!'});

    } catch (error) {
     
      res.status(500).send({message: 'Algo deu errado'})
    }
  }
}
