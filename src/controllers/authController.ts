import { Request, Response } from 'express';
import { User } from '../entity/User';
import { AuthService } from '../services/authService';
import { AuthValidationMode, authValidator } from '../validators/authValidator';

const authService = new AuthService()

export class AuthController {
  public async signup(req: Request, res: Response): Promise<Response> {
    try {
      const userToSave = req.body;

      const { valid, errors } = await authValidator(userToSave, AuthValidationMode.SIGN_UP);

      if (!valid) {
        return res.status(400).send({ message: Object.values(errors) });
      }

      const savedUser = await authService.signup(userToSave);

      res.status(201).send(savedUser);

    } catch (error) {
      console.log(error)
      res.status(500).send('Algo deu errado');
    }
  }

  public async singin(req: Request, res: Response):Promise<Response>{
    try {
      const user: User = req.body

      const { valid, errors } = await authValidator(user, AuthValidationMode.SIGN_IN);

      if(!valid){
        return res.status(400).send({message: Object.values(errors)})
      }

      const userResponse = await authService.signin(user);

      if(!userResponse) {
        return res.status(404).send({message: 'email ou senha invalidos'})
      }

      res.status(200).send(userResponse);

    } catch (error) {
      console.log(error)
      res.status(500).send('Algo deu errado');
    }
  } 
}
