type JwtPayloadType = {
    user: {
        email: string,
        role: string,
        name: string
    },
    scanningPoint: {
        name: string | null,
        pointNo: number | null
    },
    iat: number,
    exp: number
}