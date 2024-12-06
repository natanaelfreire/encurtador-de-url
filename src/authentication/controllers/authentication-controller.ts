import { Request, Response } from 'express'
import { PrismaUserRepository } from '../../users/repositories/prisma-repository/prisma-user-repository'
import { AuthenticateUser } from '../services/authenticate-user'

export default class AuthenticationController {
    async index (request: Request, response: Response): Promise<any> {
        try {
            const {
                email,
                password
            } = request.body

            const prismaUserRepository = new PrismaUserRepository()
            const authenticateUser = new AuthenticateUser(prismaUserRepository)
            const token = await authenticateUser.execute({
                email,
                password
            })

            return response.status(200).json(token)

        } catch (error: any) {
            const erro: string = error.toString()
            return response.status(400).json({ error: `${erro}` })
        }
    }
}