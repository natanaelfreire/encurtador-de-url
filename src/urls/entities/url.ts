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

    private validateUrl (props: UrlProps) {
        if (props.originalUrl == null || props.originalUrl.length === 0) {
            throw new Error('Preencha o campo "Url original"')
        }

        if (props.shortUrl == null || props.shortUrl.length === 0) {
            throw new Error('Preencha o campo "Url encurtada"')
        }
    }

    constructor (props: UrlProps) {
        this.validateUrl(props)
        let clickCounts = props.clickCounts

        if (props.id == null) {
            clickCounts = 0
        }

        this.props = {
            ...props,
            clickCounts
        }
    }
}