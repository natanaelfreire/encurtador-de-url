import { CHARS } from "../utilities/chars"
import { getRandomValueFromArray } from "../utilities/get-random-value-from-array"

export interface UrlProps {
    id?: number
    originalUrl: string
    shortUrl: string
    clickCounts: number
}

export class Url {
    private readonly props: UrlProps

    get id (): number | undefined {
        return this.props.id
    }

    get originalUrl (): string {
        return this.props.originalUrl
    }

    get shortUrl (): string {
        return this.props.shortUrl
    }

    get clickCounts (): number {
        return this.props.clickCounts
    }

    private generateShortUrl (): string {
        let shortUrl = ''

        for (let i = 0; i < 6; i++) {
            const char = getRandomValueFromArray(CHARS);
            shortUrl += char
        }

        return shortUrl
    }

    private validateUrl (props: UrlProps) {
        if (props.originalUrl == null || props.originalUrl.length === 0) {
            throw new Error('Preencha o campo "Url original"')
        }
    }

    constructor (props: UrlProps) {
        this.validateUrl(props)
        let clickCounts = props.clickCounts
        let shortUrl = props.shortUrl

        if (props.id == null) {
            clickCounts = 0
            shortUrl = this.generateShortUrl()
        }

        this.props = {
            ...props,
            clickCounts,
            shortUrl
        }
    }
}