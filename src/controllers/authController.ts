import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/verifyToken';
import { User } from '../entity/User';
import { AuthService } from '../services/authService';
import { AuthValidationMode, authValidator } from '../validators/authValidator';

const authService = new AuthService();

export class AuthController {
  public async signup(req: Request, res: Response): Promise<Response> {
    try {
      const userToSave = req.body;

      const { valid, errors } = await authValidator(
        userToSave,
        AuthValidationMode.SIGN_UP
      );

      if (!valid) {
        return res.status(400).send({ message: Object.values(errors) });
      }

      const savedUser = await authService.signup(userToSave);

      res.status(201).send(savedUser);
    } catch (error) {
      console.log(error);
      res.status(500).send('Algo deu errado');
    }
  }

  public async singin(req: Request, res: Response): Promise<Response> {
    try {
      const user: User = req.body;

      const { valid, errors } = await authValidator(
        user,
        AuthValidationMode.SIGN_IN
      );

      if (!valid) {
        return res.status(400).send({ message: Object.values(errors) });
      }

      const userResponse = await authService.signin(user);

      if (!userResponse) {
        return res.status(404).send({ message: 'email ou senha invalidos' });
      }

      res.status(200).send(userResponse);
    } catch (error) {
      console.log(error);
      res.status(500).send('Algo deu errado');
    }
  }

  public isAuth(req: Request, res: Response, next: NextFunction): Response {
    const authorization = req.headers.authorization;

    if (authorization) {
      const token = authorization.slice(7, authorization.length);
     
      try {
        const decoded =  verifyToken(token);
        req.auth = decoded
        next();
      } catch (error) {
        return res.status(403).send({ message: error.message });
      }
    } else {
      return res.status(403).send({ message: 'Sem token' });
    }
  }
}
