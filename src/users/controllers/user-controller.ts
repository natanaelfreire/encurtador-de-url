import { Request, Response } from 'express'
import { PrismaUserRepository } from '../repositories/prisma-repository/prisma-user-repository'
import { FindAllUsers } from '../services/find-all-users'
import { CreateUser } from '../services/create-user'
import { FindOneUser } from '../services/find-one-user'
import { UpdateUser } from '../services/update-user'
import { RemoveUser } from '../services/remove-user'

export default class UserController {
    async index (request: Request, response: Response): Promise<any> {
        try {
            const prismaUserRepository = new PrismaUserRepository()
            const findAllUsers = new FindAllUsers(prismaUserRepository)
            const users = await findAllUsers.execute()

            return response.status(200).json(users)

        } catch (error: any) {
            const erro: string = error.toString()
            return response.status(400).json({ error: `${erro}` })
        }
    }

    async create (request: Request, response: Response): Promise<any> {
        try {
            const {
                email,
                password
            } = request.body

            const prismaUserRepository = new PrismaUserRepository()
            const createUser = new CreateUser(prismaUserRepository)
            await createUser.execute({
                email,
                password
            })

            return response.status(201).send()
            
        } catch (error: any) {
            const erro: string = error.toString()
            return response.status(400).json({ error: `${erro}` })
        }
    }

    async show (request: Request, response: Response): Promise<any> {
        try {
            const { id } = request.params

            const prismaUserRepository = new PrismaUserRepository()
            const findOne = new FindOneUser(prismaUserRepository)
            const user = await findOne.execute(Number(id))
        
            return response.status(200).json(user)
            
        } catch (error: any) {
            const erro: string = error.toString()
            return response.status(400).json({ error: `${erro}` })
        }
    }

    async update (request: Request, response: Response): Promise<any> {
        try {
            const {
                email,
                password
            } = request.body

            const { id } = request.params

            const prismaUserRepository = new PrismaUserRepository()
            const updateUser = new UpdateUser(prismaUserRepository)
            await updateUser.execute({
                id: Number(id),
                email,
                password
            })

            return response.status(200).send()

        } catch (error: any) {
            const erro: string = error.toString()
            return response.status(400).json({ error: `${erro}` })
        }
    }

    async delete (request: Request, response: Response): Promise<any> {
        try {
            const { id } = request.params

            const prismaUserRepository = new PrismaUserRepository()
            const removeUser = new RemoveUser(prismaUserRepository)
            await removeUser.execute(Number(id))

            return response.status(200).send()

        } catch (error: any) {
            const erro: string = error.toString()
            return response.status(400).json({ error: `${erro}` })
        }
    }
}