import { User } from '../entities/user'
import { UserRepository } from '../repositories/user-repository'
import { UpdateUserDto } from '../dto/update-user-dto'
import { ResponseUserDTO } from '../repositories/dto/response-user-dto'

export class UpdateUser {
  constructor (private readonly userRepository: UserRepository) { }

  async execute ({
    id,
    email,
    password
  }: UpdateUserDto): Promise<ResponseUserDTO> {
    const user = await this.userRepository.findOne(id)

    if (user == null) { throw new Error('Usuário não encontrado.') }

    const newUserData = new User({
      email,
      password,
    })

    await this.userRepository.update(id, newUserData)

    return user
  }
}