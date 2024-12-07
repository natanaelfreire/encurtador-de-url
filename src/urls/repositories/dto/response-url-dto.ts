export type ResponseUrlDto = {
    id: number
    originalUrl: string
    shortUrl: string
    clickCounts: number
    createdAt: Date
    updatedAt: Date
    removedAt: Date | null
    userId?: number | null
    userEmail: string
}