"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidator = exports.UserUsernameAlreadyExistsError = exports.UserEmailAlreadyExistsError = exports.UserPasswordError = exports.UserEmailError = exports.UserNameError = exports.AuthValidationMode = void 0;
const userService_1 = require("../services/userService");
var AuthValidationMode;
(function (AuthValidationMode) {
    AuthValidationMode[AuthValidationMode["SIGN_UP"] = 0] = "SIGN_UP";
    AuthValidationMode[AuthValidationMode["SIGN_IN"] = 1] = "SIGN_IN";
})(AuthValidationMode = exports.AuthValidationMode || (exports.AuthValidationMode = {}));
const UserNameError = (username) => {
    if (!username || username.trim() === '') {
        return 'O username não deve estar vazio';
    }
};
exports.UserNameError = UserNameError;
const UserEmailError = (email) => {
    // eslint-disable-next-line no-useless-escape
    const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!email || email.trim() === '') {
        return 'O email não deve estar vazio';
    }
    if (!email.match(regex)) {
        return 'Email invalido';
    }
};
exports.UserEmailError = UserEmailError;
const UserPasswordError = (password) => {
    if (!password || password.trim() === '') {
        return 'A senha não pode estar vazia';
    }
    if (password.length < 6) {
        return 'A senha deve ter pelo menos 6 caracteres';
    }
};
exports.UserPasswordError = UserPasswordError;
const UserEmailAlreadyExistsError = async (email) => {
    const userService = new userService_1.UserService();
    const userFoundByEmail = await userService.findUserByEmail(email);
    if (userFoundByEmail) {
        return "Esse email já está cadastrado";
    }
};
exports.UserEmailAlreadyExistsError = UserEmailAlreadyExistsError;
const UserUsernameAlreadyExistsError = async (username) => {
    const userService = new userService_1.UserService();
    const userFoundByUsername = await userService.findUserByUsername(username);
    if (userFoundByUsername) {
        return "Esse username já está cadastrado";
    }
};
exports.UserUsernameAlreadyExistsError = UserUsernameAlreadyExistsError;
const authValidator = async (user, mode) => {
    const errors = {};
    const userEmailError = (0, exports.UserEmailError)(user.email);
    const userPasswordError = (0, exports.UserPasswordError)(user.password);
    if (userEmailError) {
        errors.email = userEmailError;
    }
    if (userPasswordError) {
        errors.password = userPasswordError;
    }
    if (mode === AuthValidationMode.SIGN_UP) {
        const usernameError = (0, exports.UserNameError)(user.username);
        if (usernameError) {
            errors.username = usernameError;
        }
        else {
            const userUsernameAlreadyExistsError = await (0, exports.UserUsernameAlreadyExistsError)(user.username);
            if (userUsernameAlreadyExistsError) {
                errors.username = userUsernameAlreadyExistsError;
            }
        }
        if (!userEmailError) {
            const userEmailAlreadyExistsError = await (0, exports.UserEmailAlreadyExistsError)(user.email);
            if (userEmailAlreadyExistsError) {
                errors.email = userEmailAlreadyExistsError;
            }
        }
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};
exports.authValidator = authValidator;
//# sourceMappingURL=authValidator.js.map