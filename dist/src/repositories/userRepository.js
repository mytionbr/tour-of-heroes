"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("../entity/User");
const typeorm_1 = require("typeorm");
class UserRepository {
    async save(user) {
        const repository = this.getRepository();
        return await repository.save(user);
    }
    async delete(userId) {
        const repository = this.getRepository();
        await repository.delete(userId);
    }
    async findUserByEmail(email) {
        const repository = this.getRepository();
        return await repository.findOne({ email });
    }
    async findUserByUsername(username) {
        const repository = this.getRepository();
        return await repository.findOne({ username });
    }
    getRepository() {
        return (0, typeorm_1.getRepository)(User_1.User);
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=userRepository.js.map