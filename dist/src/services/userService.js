"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const userRepository_1 = require("../repositories/userRepository");
const userRepository = new userRepository_1.UserRepository();
class UserService {
    async save(user) {
        return await userRepository.save(user);
    }
    async findUserByEmail(email) {
        return await userRepository.findUserByEmail(email);
    }
    async findUserByUsername(username) {
        return await userRepository.findUserByUsername(username);
    }
    async delete(userId) {
        await userRepository.delete(userId);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map