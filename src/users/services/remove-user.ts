import { UserRepository } from "../repositories/user-repository";

export class RemoveUser {
    constructor (private readonly userRepository: UserRepository) {}

    async execute (id: number): Promise<void> {
        const user = await this.userRepository.findOne(id)
    
        if (user === null) { throw new Error('Usuário não encontrado.') }
    
        await this.userRepository.remove(id)
    }
}