import { RequestUrlDTO } from "./dto/request-url-dto"
import { ResponseUrlDTO } from "./dto/response-url-dto"

export interface UrlRepository {
    create: (url: RequestUrlDTO) => Promise<void>
    findOne: (id: number) => Promise<ResponseUrlDTO | null>
    findByShortUrl: (shortUrl: string) => Promise<ResponseUrlDTO | null>
    findAllByUser: (userId: number) => Promise<ResponseUrlDTO[]>
    update: (id: number, url: RequestUrlDTO) => Promise<void>
    remove: (id: number) => Promise<void>
}
