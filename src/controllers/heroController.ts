import { Request, Response } from 'express';
import { Hero } from '../entity/Hero';
import { HeroDTO } from '../dtos/heroDTO';
import { heroValidator } from '../validators/heroValidator';
import { HeroService } from '../services/heroService';

const heroService = new HeroService();

export class HeroController {
  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const heroes = await heroService.getAll();
      res.status(200).send(heroes);
    } catch (error) {
      console.log(error)
      res.status(500).send('Algo deu errado');
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, about, category, agency } = req.body;
      const userId = Number(req.auth.id);
      
      const hero: HeroDTO = {
        name,
        about,
        category,
        agency,
        user:{id: userId}
      };

      const { valid, errors } = heroValidator(hero);

      if (!valid) {
        return res.status(400).send({ message: Object.values(errors) });
      }      

      const newHero = await heroService.create(hero);

      res.status(201).send(newHero);
    } catch (error) {
      res.status(500).send({ message: 'Algo deu errado' });
    }
  }

  public async remove(req: Request, res: Response): Promise<Response> {
    try {
      const heroId = Number(req.params.heroId);

      const heroToRemove = await heroService.findById(heroId);

      if (!heroToRemove) {
        return res.status(404).send({ message: 'Herói não cadastrado' })
      }

      await heroService.remove(heroToRemove);

      res.status(200).send({ message: 'Herói removido com sucesso!' });

    } catch (error) {
      res.status(500).send({ message: 'Algo deu errado' })
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const heroId = Number(req.params.heroId);
      const heroToUpdate = req.body;

      const { valid, errors } = heroValidator(heroToUpdate);

      if (!valid) {
        return res.status(400).send({ message: Object.values(errors) });
      }

      await heroService.update(heroId, heroToUpdate);
      res.status(200).send({
        message: 'Herói atualizado com sucesso!'
      })
    } catch (error) {
      res.status(500).send({
        message: 'Algo deu errado'
      })
    }
  }

  public async findById(req: Request, res: Response): Promise<Response>{
    try {
      const heroId = Number(req.params.heroId);

      const hero = await heroService.findById(heroId);

      if(!hero){
        return res.status(400).send({message: 'Herói não encontrado'});
      }

      res.status(200).send(hero);

    } catch (error) {
      res.status(500).send({message: 'Algo deu errado'})
    }
  }

  public async findByName(req: Request, res: Response): Promise<void> {
    try {
      const heroName = req.params.heroName;
      const heroes = await heroService.findByName(heroName);
      res.status(200).send(heroes);
    } catch (error) {
      res.status(500).send({message: 'Algo deu errado'})
    }
  }

  public async findByUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = Number(req.params.id);

      const authId = Number(req.auth.id);
  
      if (authId !== userId) {
       return res.status(403).send({message: 'O usuário não tem permissão para essa operação'});
      }

      const heroes = await heroService.findByUser(authId);
      res.status(200).send(heroes);
    } catch (error) {
      res.status(500).send({message: 'Algo deu errado'});
    }
  }

}
