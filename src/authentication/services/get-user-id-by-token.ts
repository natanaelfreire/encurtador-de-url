import jwt from 'jsonwebtoken'

export class GetUserIdByToken {
    execute (tkn: string): number | null {
        const token = tkn?.replace('Bearer', '').replace(' ', '')
        const secret = process.env.SECRET as string
        let userId: number | null = null;

        jwt.verify(token as string, secret, (err, decoded: any) => {
            if (err === null) {
                userId = decoded?.userId
            }
        })

        return userId
    }
}