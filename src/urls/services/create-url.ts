import { CreateUrlDto } from "../dto/create-url-dto";
import { Url } from "../entities/url";
import { UrlRepository } from "../repositories/url-repository";
import { CHARS } from "../utilities/chars";
import { getRandomValueFromArray } from "../utilities/get-random-value-from-array";

export class CreateUrl {
    constructor (private readonly urlRepository: UrlRepository) {}

    async execute ({
        originalUrl,
        userId
      }: CreateUrlDto): Promise<void> {
        const url = new Url({
            originalUrl: originalUrl,
            clickCounts: 0,
            shortUrl: this.generateShortUrl(),
            userId: userId
        })

        await this.urlRepository.create(url)
    }

    private generateShortUrl (): string {
        let shortUrl = ''

        for (let i = 0; i < 6; i++) {
            const char = getRandomValueFromArray(CHARS);
            shortUrl += char
        }

        return shortUrl
    }
}
