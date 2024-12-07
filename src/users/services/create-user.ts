import { User } from '../entities/user'
import { UserRepository } from '../repositories/user-repository'
import { CreateUserDto } from '../dto/create-user-dto'

export class CreateUser {
    constructor (private readonly userRepository: UserRepository) { }

    async execute ({
        email,
        password
    }: CreateUserDto): Promise<void> {
        const user = new User({
            email,
            password,
        })

        await this.userRepository.create(user)
    }
}
