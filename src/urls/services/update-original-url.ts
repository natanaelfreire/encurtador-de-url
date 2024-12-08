import { UpdateOriginalUrlDto } from "../dto/update-original-url-dto";
import { Url } from "../entities/url";
import { UrlRepository } from "../repositories/url-repository";

export class UpdateOriginalUrl {
    constructor (private readonly urlRepository: UrlRepository) {}

    async execute ({
        id,
        originalUrl,
        userId
      }: UpdateOriginalUrlDto): Promise<void> {    
        await this.urlRepository.updateOriginalUrl(
            id,
            originalUrl,
            userId
        )
    }
}
