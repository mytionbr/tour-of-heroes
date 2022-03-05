import { UserService } from "../services/userService";
import { User } from "../entity/User";

interface UserErrors {
    username?: string;
    email?: string;
    password?: string;
}


export interface RegistrationErros  {
  email?: string;
  username?: string;
}

export enum AuthValidationMode {
  "SIGN_UP",
  "SIGN_IN"
}
  
export const UserNameError = (username: string) => {
  if (!username || username.trim() === '') {
    return 'O username não deve estar vazio';
  }
};

export const UserEmailError = (email: string) => {
  // eslint-disable-next-line no-useless-escape
  const regex =  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  
  if (!email || email.trim() === '') {
    return 'O email não deve estar vazio';
  }
  if(!email.match(regex)){
    return 'Email invalido'
  }
};

export const UserPasswordError = (password: string) => {
  if (!password || password.trim() === '') {
    return 'A senha não pode estar vazia';
  }
  if (password.length < 6) {
    return 'A senha deve ter pelo menos 6 caracteres';
  }
};

export const UserEmailAlreadyExistsError = async (email: string) =>{
  const userService = new UserService();

  const userFoundByEmail = await userService.findUserByEmail(email);
  
  if(userFoundByEmail){
    return "Esse email já está cadastrado";
  }
}

export const UserUsernameAlreadyExistsError = async (username: string) =>{
  const userService = new UserService();

  const userFoundByUsername = await userService.findUserByUsername(username);
  
  if(userFoundByUsername){
    return "Esse username já está cadastrado";
  }
}

export const authValidator = async (user: User, mode: AuthValidationMode) => {
  const errors: UserErrors = {};

  const userEmailError = UserEmailError(user.email);
  const userPasswordError = UserPasswordError(user.password);

  if (userEmailError) {
    errors.email = userEmailError;
  }
  if (userPasswordError) {
    errors.password = userPasswordError;
  }

  if(mode === AuthValidationMode.SIGN_UP){
    const usernameError = UserNameError(user.username);

    if(usernameError){
      errors.username = usernameError;
    } else {
      const userUsernameAlreadyExistsError = await UserUsernameAlreadyExistsError(user.username);
      if(userUsernameAlreadyExistsError){
        errors.username =  userUsernameAlreadyExistsError;
      }
    }

    if(!userEmailError){
      const userEmailAlreadyExistsError = await UserEmailAlreadyExistsError(user.email)

      if(userEmailAlreadyExistsError){
        errors.email = userEmailAlreadyExistsError;
      }
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
