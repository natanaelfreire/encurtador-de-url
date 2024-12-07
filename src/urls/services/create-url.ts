import { CreateUrlDto } from "../dto/create-url-dto";
import { Url } from "../entities/url";
import { UrlRepository } from "../repositories/url-repository";

export class CreateUrl {
    constructor (private readonly urlRepository: UrlRepository) {}

    async execute ({
        originalUrl
      }: CreateUrlDto): Promise<void> {
        const url = new Url({
            originalUrl: originalUrl,
            clickCounts: 0,
            shortUrl: ''
        })
    
        await this.urlRepository.create(url)
    }
}