import { User } from "../entities/user";
import { UserRepository } from "../repositories/user-repository";

export class FindOneUser {
    constructor (private readonly userRepository: UserRepository) {}

    async execute (id: number): Promise<User | null> {
        const user = await this.userRepository.findOne(id)

        return user
    }
}