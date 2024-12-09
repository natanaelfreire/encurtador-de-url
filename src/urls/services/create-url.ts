import { CreateUrlDto } from "../dto/create-url-dto";
import { Url } from "../entities/url";
import { ResponseUrlDto } from "../repositories/dto/response-url-dto";
import { UrlRepository } from "../repositories/url-repository";
import { CHARS } from "../utilities/chars";
import { getRandomValueFromArray } from "../utilities/get-random-value-from-array";

export class CreateUrl {
    constructor (private readonly urlRepository: UrlRepository) {}

    async execute ({
        originalUrl,
        userId
      }: CreateUrlDto): Promise<ResponseUrlDto> {
        let shortUrlAlreadyExists = true
        let shortUrl = ''

        while (shortUrlAlreadyExists) {
            shortUrl = this.generateShortUrl()
            const urlExists = await this.urlRepository.findByShortUrl(shortUrl)
            shortUrlAlreadyExists = urlExists !== null
        }
        
        const url = new Url({
            originalUrl: originalUrl,
            clickCounts: 0,
            shortUrl: this.generateShortUrl(),
            userId: userId
        })

        const response = await this.urlRepository.create(url)

        return response
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
