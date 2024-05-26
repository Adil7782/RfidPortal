type JwtPayloadType = {
    user: {
        email: string,
        role: string,
        name: string
    },
    scanningPoint: {
        name: string | null,
        pointNo: string | null,
        section: string | null,
    },
    iat: number,
    exp: number
}