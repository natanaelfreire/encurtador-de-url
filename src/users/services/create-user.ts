import { User } from '../entities/user'
import { UserRepository } from '../repositories/user-repository'
import { CreateUserDto } from '../dto/create-user-dto'

type CreateUserResponse = User

export class CreateUser {
  constructor (private readonly userRepository: UserRepository) { }

  async execute ({
    email,
    password
  }: CreateUserDto): Promise<CreateUserResponse> {
    const user = new User({
      email,
      password,
    })

    await this.userRepository.create(user)

    return user
  }
}