import { UpdateUrlDto } from "../dto/update-url-dto";
import { Url } from "../entities/url";
import { UrlRepository } from "../repositories/url-repository";

export class CreateUrl {
    constructor (private readonly urlRepository: UrlRepository) {}

    async execute ({
        id,
        originalUrl,
        shortUrl,
        clickCounts
      }: UpdateUrlDto): Promise<void> {
        const url = new Url({
            id: id,
            originalUrl: originalUrl,
            shortUrl: shortUrl,
            clickCounts: clickCounts
        })
    
        await this.urlRepository.update(id, url)
    }
}
