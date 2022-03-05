import { User } from "../entity/User";
import { getRepository, Repository } from "typeorm";
import { UserDTO } from "../dtos/userDTO";

export class UserRepository {

    public async save(user: UserDTO): Promise<User> {
        const repository = this.getRepository();
        return await repository.save(user);
    }

    public async delete(userId: number): Promise<void> {
        const repository = this.getRepository();
        await repository.delete(userId)
    }

    public async findUserByEmail(email: string): Promise<User> {
        const repository = this.getRepository();
        return await repository.findOne({email});
    }

    public async findUserByUsername(username: string): Promise<User> {
        const repository = this.getRepository();
        return await repository.findOne({username})
    }

    private getRepository(): Repository<User> {
        return getRepository(User);
    }
}