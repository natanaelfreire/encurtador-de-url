import { prisma } from "../../../database/prisma";
import { RequestUrlDto } from "../dto/request-url-dto";
import { ResponseUrlDto } from "../dto/response-url-dto";
import { UrlRepository } from "../url-repository";

export class PrismaUrlRepository implements UrlRepository {
    async create (url: RequestUrlDto): Promise<ResponseUrlDto> {
        const resp = await prisma.url.create({
            data: {
                originalUrl: url.originalUrl,
                shortUrl: url.shortUrl,
                clickCounts: url.clickCounts,
                userId: url.userId
            }
        })

        return {
            id: resp.id,
            clickCounts: resp.clickCounts,
            originalUrl: resp.originalUrl,
            shortUrl: resp.shortUrl,
            userEmail: '',
            userId: resp.userId,
            removedAt: resp.removedAt,
            updatedAt: resp.updatedAt,
            createdAt: resp.createdAt
        }
    }

    async findOne (id: number): Promise<ResponseUrlDto | null> {
        const url = await prisma.url.findFirst({
            where: {
                id: id,
                removedAt: null
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
                removedAt: null
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
                userEmail: '',
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
                removedAt: null
            },
            include: {
                user: true
            }
        })

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

    async updateOriginalUrl (id: number, originalUrl: string, userId: number): Promise<void> {
        await prisma.url.update({
            where: {
                id: id,
                userId: userId,
                removedAt: null
            },
            data: {
                originalUrl: originalUrl,
            }
        })
    }

    async remove (id: number, userId: number): Promise<void> {
        await prisma.url.update({
            where: {
                id: id,
                removedAt: null,
                userId: userId
            },
            data: {
                removedAt: new Date().toISOString()
            }
        })
    }

    async updateClickCounts (shortUrl: string): Promise<void> {
        const url = await this.findByShortUrl(shortUrl)

        if (url !== null) {
            await prisma.url.update({
                where: {
                    id: url.id,
                    shortUrl: shortUrl
                },
                data: {
                    clickCounts: url.clickCounts + 1
                }
            })
        }
    }
}
