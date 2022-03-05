import { UserResponseDTO } from '../dtos/userDTO';
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt'
import { generateToken } from '../utils/generateToken'
import { UserService } from './userService';

const userService = new UserService();

export class AuthService {

  public async signup(user: User): Promise<UserResponseDTO> {
    const hashPassword = bcrypt.hashSync(user.password, 8);

    const userToSave: User = {
      ...user,
      password: hashPassword
    }

    const savedUser = await userService.save(userToSave);

    const token = generateToken(savedUser);

    const userResponse: UserResponseDTO = {
      id: savedUser.id,
      username: savedUser.username,
      token
    }

    return userResponse;
  }

  public async signin(user: User): Promise<UserResponseDTO | null> {
    const userFound = await userService.findUserByEmail(user.email);

    if (!userFound) {
      return null;
    }

    const validPassword = bcrypt.compareSync(user.password, userFound.password);

    if (validPassword) {
      const token = generateToken(userFound)

      const userResponse: UserResponseDTO = {
        id: userFound.id,
        username: userFound.username,
        token
      }

      return userResponse;
    }

    return null;
  }
}
