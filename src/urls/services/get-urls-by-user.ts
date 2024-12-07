import { ResponseUrlDTO } from "../repositories/dto/response-url-dto";
import { UrlRepository } from "../repositories/url-repository";

export class GetUrlsByUser {
    constructor (private readonly urlRepository: UrlRepository) {}

    async execute (userId: number): Promise<ResponseUrlDTO[]> {
        const urls = await this.urlRepository.findAllByUser(userId)

        return urls
    }
}
