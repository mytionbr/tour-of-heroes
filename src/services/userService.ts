import { UserDTO, UserResponseDTO } from '../dtos/userDTO';
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt'
import { UserRepository } from '../repositories/userRepository';
import { generateToken } from '../utils/generateToken'

const userRepository = new UserRepository();

export class UserService {

  public async save(user: UserDTO): Promise<User> {   
    return await userRepository.save(user);
  }

  public async findUserByEmail(email: string): Promise<User>{
    return await userRepository.findUserByEmail(email);
  }

  public async findUserByUsername(username: string): Promise<User>{
    return await userRepository.findUserByUsername(username);
  }

  public async delete(userId: number): Promise<void>{
    await userRepository.delete(userId);
  }

 

}
