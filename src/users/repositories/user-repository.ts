import { User } from '../entities/user.entity'

export interface UserRepository {
  create: (user: User) => Promise<void>
  findOne: (id: number) => Promise<User | null>
  findAll: () => Promise<User[]>
  update: (id: number, user: User) => Promise<void>
  remove: (id: number) => Promise<void>
  validatePassword: (name: string, password: string) => Promise<boolean>
}