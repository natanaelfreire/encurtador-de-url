import { prisma } from "../../../database/prisma";
import { RequestUrlDto } from "../dto/request-url-dto";
import { ResponseUrlDto } from "../dto/response-url-dto";
import { UrlRepository } from "../url-repository";

export class PrismaUrlRepository implements UrlRepository {
    async create (url: RequestUrlDto): Promise<void> {
        await prisma.url.create({
            data: {
                originalUrl: url.originalUrl,
                shortUrl: url.shortUrl,
                clickCounts: url.clickCounts,
                userId: url.userId
            }
        })
    }

    async findOne (id: number): Promise<ResponseUrlDto | null> {
        const url = await prisma.url.findFirst({
            where: {
                id: id,
                NOT: {
                    removedAt: null
                }
            },
            include: {
                user: true
            }
        })

        if (url !== null) {
            return {
                id: url.id,
                originalUrl: url.originalUrl,
                shortUrl: url.shortUrl,
                clickCounts: url.clickCounts,
                createdAt: url.createdAt,
                updatedAt: url.updatedAt,
                removedAt: url.removedAt,
                userEmail: url.user?.email ?? '',
                userId: url.userId
            }
        }
        else
            return url
    }

    async findByShortUrl (shortUrl: string): Promise<ResponseUrlDto | null> {
        const url = await prisma.url.findFirst({
            where: {
                shortUrl: shortUrl,
                NOT: {
                    removedAt: null
                }
            },
            include: {
                user: true
            }
        })

        if (url !== null) {
            return {
                id: url.id,
                originalUrl: url.originalUrl,
                shortUrl: url.shortUrl,
                clickCounts: url.clickCounts,
                createdAt: url.createdAt,
                updatedAt: url.updatedAt,
                removedAt: url.removedAt,
                userEmail: url.user?.email ?? '',
                userId: url.userId
            }
        }
        else
            return url
    }

    async findAllByUser (userId: number): Promise<ResponseUrlDto[]> {
        const urls = await prisma.url.findMany({
            where: {
                userId: userId,
            },
            include: {
                user: true
            }
        })

        console.log('urls: ', urls)

        return urls.map(item => {
            let url : ResponseUrlDto = {
                id: item.id,
                originalUrl: item.originalUrl,
                shortUrl: item.shortUrl,
                clickCounts: item.clickCounts,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                removedAt: item.removedAt,
                userEmail: item.user?.email ?? '',
                userId: item.userId
            }

            return url
        })
    }

    async update (id: number, url: RequestUrlDto): Promise<void> {
        await prisma.url.update({
            where: {
                id: id
            },
            data: {
                originalUrl: url.originalUrl,
                shortUrl: url.shortUrl,
                clickCounts: url.clickCounts,
                userId: url.userId
            }
        })
    }

    async remove (id: number): Promise<void> {
        const url = await prisma.url.findFirst({
            where: {
                id: id
            }
        })

        await prisma.url.update({
            where: {
                id: id
            },
            data: {
                ...url,
                removedAt: new Date().toISOString()
            }
        })
    }

}
