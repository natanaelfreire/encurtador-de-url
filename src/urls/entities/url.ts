export interface UrlProps {
    id?: number
    originalUrl: string
    shortUrl: string
    clickCounts: number
    userId?: number
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

    get userId (): number | undefined {
        return this.props.userId
    }

    private validateUrl (props: UrlProps) {
        if (props.originalUrl === null || props.originalUrl === undefined || props.originalUrl.length === 0) {
            throw new Error('Preencha o campo "Url original"')
        }

        if (props.shortUrl === null || props.shortUrl === undefined || props.shortUrl.length === 0) {
            throw new Error('Preencha o campo "Url encurtada"')
        }
    }

    constructor (props: UrlProps) {
        this.validateUrl(props)
        let clickCounts = props.clickCounts

        if (props.id === null || props.id === undefined) {
            clickCounts = 0
        }

        this.props = {
            ...props,
            clickCounts
        }
    }
}