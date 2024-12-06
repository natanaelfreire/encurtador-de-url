import { User } from "../entities/user";
import { UserRepository } from "../repositories/user-repository";

type FindAllUsersResponse = Omit<User, "password">

export class FindAllUsers {
    constructor (private readonly userRepository: UserRepository) {}

    async execute (): Promise<FindAllUsersResponse[]> {
        const users = await this.userRepository.findAll()

        return users
    }
}