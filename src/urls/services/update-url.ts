import { UpdateUrlDto } from "../dto/update-url-dto";
import { Url } from "../entities/url";
import { UrlRepository } from "../repositories/url-repository";

export class CreateUrl {
    constructor (private readonly urlRepository: UrlRepository) {}

    async execute ({
        id,
        shortUrl,
        originalUrl
      }: UpdateUrlDto): Promise<void> {
        const url = new Url({
            originalUrl: originalUrl,
            clickCounts: 0,
            shortUrl: shortUrl
        })
    
        await this.urlRepository.update(id, { originalUrl: url.originalUrl })
    }
}