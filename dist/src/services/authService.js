"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt = require("bcrypt");
const generateToken_1 = require("../utils/generateToken");
const userService_1 = require("./userService");
const userService = new userService_1.UserService();
class AuthService {
    async signup(user) {
        const hashPassword = bcrypt.hashSync(user.password, 8);
        const userToSave = {
            ...user,
            password: hashPassword
        };
        const savedUser = await userService.save(userToSave);
        const token = (0, generateToken_1.generateToken)(savedUser);
        const userResponse = {
            id: savedUser.id,
            token
        };
        return userResponse;
    }
    async signin(user) {
        const userFound = await userService.findUserByEmail(user.email);
        if (!userFound) {
            return null;
        }
        const validPassword = bcrypt.compareSync(user.password, userFound.password);
        if (validPassword) {
            const token = (0, generateToken_1.generateToken)(userFound);
            const userResponse = {
                id: userFound.id,
                token
            };
            return userResponse;
        }
        return null;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map