import { ResponseUserDTO } from "../repositories/dto/response-user-dto";
import { UserRepository } from "../repositories/user-repository";

export class FindAllUsers {
    constructor (private readonly userRepository: UserRepository) {}

    async execute (): Promise<ResponseUserDTO[]> {
        const users = await this.userRepository.findAll()

        return users
    }
}
