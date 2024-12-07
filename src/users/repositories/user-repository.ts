import { RequestUserDTO } from './dto/request-user-dto'
import { ResponseUserDTO } from './dto/response-user-dto'

export interface UserRepository {
    create: (user: RequestUserDTO) => Promise<void>
    findOne: (id: number) => Promise<ResponseUserDTO | null>
    findByEmail: (email: string) => Promise<ResponseUserDTO | null>
    findAll: () => Promise<ResponseUserDTO[]>
    update: (id: number, user: RequestUserDTO) => Promise<void>
    remove: (id: number) => Promise<void>
}
