import { prisma } from "../../../database/prisma";
import { RequestUserDTO } from "../dto/request-user-dto";
import { ResponseUserDTO } from "../dto/response-user-dto";
import { UserRepository } from "../user-repository";

export class PrismaUserRepository implements UserRepository {
    async findByEmail (email: string): Promise<ResponseUserDTO | null> {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
                removedAt: null
            }
        })

        if (user !== null) {
            return {
                email: user.email,
                password: user.password,
                id: user.id
            }
        }
        else    
            return user        
    }

    async create (user: RequestUserDTO): Promise<void> {
        await prisma.user.create({
            data: {
                email: user.email,
                password: user.password
            }
        })
    }

    async findOne (id: number): Promise<ResponseUserDTO | null> {
        const userDb = await prisma.user.findFirst({
            where: {
                id: id,
                removedAt: null
            }
        })

        if (userDb != null) {
            return {
                email: userDb.email,
                password: userDb.password,
                id: userDb.id
            }
        }
        else 
            return userDb
    }

    async findAll (): Promise<ResponseUserDTO[]> {
        const usersDb = await prisma.user.findMany({
            where: {
                removedAt: null
            }
        })

        const users = usersDb.map(u => {
            let item: ResponseUserDTO = {
                email: u.email,
                password: u.password,
                id: u.id
            }

            return item
        })

        return users
    }

    async update (id: number, user: RequestUserDTO): Promise<void> {
        await prisma.user.update({
            where: {
                id: id,
                removedAt: null
            },
            data: {
                email: user.email,
                password: user.password
            }
        })
    }

    async remove (id: number): Promise<void> {
        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                removedAt: new Date().toISOString()
            }
        })
    }
}
