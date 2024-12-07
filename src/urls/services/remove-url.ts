import { UrlRepository } from "../repositories/url-repository";

export class RemoveUrl {
    constructor (private readonly urlRepository: UrlRepository) {}

    async execute (id: number): Promise<void> {
        await this.urlRepository.remove(id)
    }
}
