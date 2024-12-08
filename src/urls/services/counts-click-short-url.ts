import { UrlRepository } from "../repositories/url-repository";

export class CountsClickShortUrl {
    constructor (private readonly urlRepository: UrlRepository) {}

    async execute (shortUrl: string) : Promise<void> {
        await this.urlRepository.updateClickCounts(shortUrl)
    }
}