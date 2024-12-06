import { ResponseUserDTO } from "../repositories/dto/response-user-dto";
import { UserRepository } from "../repositories/user-repository";

export class FindUserByEmail {
    constructor (private readonly userRepository: UserRepository) {}

    async execute (id: number): Promise<ResponseUserDTO | null> {
        const user = await this.userRepository.findOne(id)

        return user
    }
}