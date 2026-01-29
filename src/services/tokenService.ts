import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_PRIVATE_KEY!

export type AccessTokenPayload = {
    sub: number
    email: string
}

export class TokenService {
    static signAccess(payload: AccessTokenPayload) {
        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: '30m',
            issuer: 'api',
        })
    }

    static verifyAccess(token: string): AccessTokenPayload {
        return jwt.verify(token, JWT_SECRET) as unknown as AccessTokenPayload
    }
}