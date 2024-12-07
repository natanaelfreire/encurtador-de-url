import { RequestUrlDto } from "./dto/request-url-dto"
import { ResponseUrlDto } from "./dto/response-url-dto"

export interface UrlRepository {
    create: (url: RequestUrlDto) => Promise<void>
    findOne: (id: number) => Promise<ResponseUrlDto | null>
    findByShortUrl: (shortUrl: string) => Promise<ResponseUrlDto | null>
    findAllByUser: (userId: number) => Promise<ResponseUrlDto[]>
    update: (id: number, url: RequestUrlDto) => Promise<void>
    remove: (id: number) => Promise<void>
}
