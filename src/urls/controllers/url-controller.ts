import { Request, Response } from 'express'
import { PrismaUrlRepository } from '../repositories/prisma-repository/prisma-url-repository'
import { GetUrlsByUser } from '../services/get-urls-by-user'
import { CreateUrl } from '../services/create-url'
import { GetOriginalUrlByShortUrl } from '../services/get-original-url-by-short-url'
import { UpdateOriginalUrl } from '../services/update-original-url'
import { RemoveUrl } from '../services/remove-url'
import { GetUserIdByToken } from '../../authentication/services/get-user-id-by-token'
import { CountsClickShortUrl } from '../services/counts-click-short-url'

export default class UrlController {
    async indexByUser (request: Request, response: Response): Promise<any> {
        try {
            const getUserIdByToken = new GetUserIdByToken()
            const userId = getUserIdByToken.execute(request.headers.authorization ?? '')

            if (userId === null) {
                throw new Error("Usuário não autenticado.")
            }

            const prismaUrlRepository = new PrismaUrlRepository()
            const getUrlsByUser = new GetUrlsByUser(prismaUrlRepository)
            const urls = await getUrlsByUser.execute(Number(userId))

            return response.status(200).json(urls)

        } catch (error: any) {
            const erro: string = error.toString()
            return response.status(400).json({ error: `${erro}` })
        }
    }

    async create (request: Request, response: Response): Promise<any> {
        try {
            const {
                originalUrl
            } = request.body

            const getUserIdByToken = new GetUserIdByToken()
            const userId = getUserIdByToken.execute(request.headers.authorization ?? '')

            const prismaUrlRepository = new PrismaUrlRepository()
            const createUrl = new CreateUrl(prismaUrlRepository)
            const url = await createUrl.execute({
                originalUrl: originalUrl,
                userId: userId ? userId : undefined
            })

            return response.status(200).send(`http://localhost:${process.env.PORT}/${url.shortUrl}`)
            
        } catch (error: any) {
            const erro: string = error.toString()
            return response.status(400).json({ error: `${erro}` })
        }
    }
    
    async changeOriginalUrl (request: Request, response: Response): Promise<any> {
        try {
            const {
                originalUrl                
            } = request.body

            const { id } = request.params
            const getUserIdByToken = new GetUserIdByToken()
            const userId = getUserIdByToken.execute(request.headers.authorization ?? '')

            if (userId === null) {
                throw new Error("Usuário não autenticado.")
            }

            const prismaUrlRepository = new PrismaUrlRepository()
            const updateOriginalUrl = new UpdateOriginalUrl(prismaUrlRepository)
            await updateOriginalUrl.execute({
                id: Number(id),
                originalUrl,
                userId
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
            const getUserIdByToken = new GetUserIdByToken()
            const userId = getUserIdByToken.execute(request.headers.authorization ?? '')

            if (userId === null) {
                throw new Error("Usuário não autenticado.")
            }

            const prismaUrlRepository = new PrismaUrlRepository()
            const removeUrl = new RemoveUrl(prismaUrlRepository)
            await removeUrl.execute(Number(id), userId)

            return response.status(200).send()

        } catch (error: any) {
            const erro: string = error.toString()
            return response.status(400).json({ error: `${erro}` })
        }
    }

    async clickShortUrl (request: Request, response: Response): Promise<any> {
        try {
            const { shortUrl } = request.params

            const prismaUrlRepository = new PrismaUrlRepository()
            const getOriginalUrlByShortUrl = new GetOriginalUrlByShortUrl(prismaUrlRepository)
            const originalUrl = await getOriginalUrlByShortUrl.execute(shortUrl)
            
            const updateClickCounts = new CountsClickShortUrl(prismaUrlRepository)
            await updateClickCounts.execute(shortUrl)

            return response.redirect(originalUrl as string)

        } catch (error: any) {
            const erro: string = error.toString()
            return response.status(400).json({ error: `${erro}` })
        }
    }
}