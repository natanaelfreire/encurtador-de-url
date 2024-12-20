import { RequestUrlDto } from "./dto/request-url-dto"
import { ResponseUrlDto } from "./dto/response-url-dto"

export interface UrlRepository {
    create: (url: RequestUrlDto) => Promise<ResponseUrlDto>
    findOne: (id: number) => Promise<ResponseUrlDto | null>
    findByShortUrl: (shortUrl: string) => Promise<ResponseUrlDto | null>
    findAllByUser: (userId: number) => Promise<ResponseUrlDto[]>
    updateOriginalUrl: (id: number, originalUrl: string, userId: number) => Promise<void>
    remove: (id: number, userId: number) => Promise<void>
    updateClickCounts: (shortUrl: string) => Promise<void>
}
