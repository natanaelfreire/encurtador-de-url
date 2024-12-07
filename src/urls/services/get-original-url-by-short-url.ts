import { UrlRepository } from "../repositories/url-repository";

export class GetOriginalUrlByShortUrl {
    constructor (private readonly urlRepository: UrlRepository) {}

    async execute (shortUrl: string): Promise<string | null> {
        const url = await this.urlRepository.findByShortUrl(shortUrl)

        return url ? url.originalUrl : null
    }
}
