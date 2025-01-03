import { getSecretKey } from "@/app/lib/jwt"
import { NextResponse } from "next/server"
import { SignJWT } from "jose"
import { v4 as uuidv4 } from 'uuid'
import { prisma } from '@/app/lib/prisma'

// ACCESS VE REFRESH TOKEN OLUŞTURMAKTAN SORUMLUDUR
export async function GET(request) {    

    try {
        const secretKey = getSecretKey()
        const userID = uuidv4()

        // CREATE ACCESS TOKEN
        const accessToken = await new SignJWT({ userId: userID })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('5m')
            .sign(secretKey)

        // CREATE REFRESH TOKEN
        const refreshToken = uuidv4()

        return NextResponse.json({accessToken, refreshToken, userID}, {status: 200})

    } catch (error) {
        return NextResponse.json(
            {
                error: true,
                message: 'Token oluşturulurken bir hata oluştu',
                details: error.message
            }, 
            {status: 500})
    }
}

// ACCESS TOKEN VE REFRESH TOKEN GÜNCELLEMEKTEN SORUMLUDUR
export async function PUT(request) {

    try {
        
        const secretKey = getSecretKey()
        const rt = String(request.headers.get('X-Refresh-Token'))

        const user = await prisma.user.findFirst({
            where: {
                refreshToken: rt
            }
        })

        // CREATE NEW ACCESS TOKEN
        const newAccessToken = await new SignJWT({ userId: user.userId })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('5m')
            .sign(secretKey)

        // CREATE NEW REFRESH TOKEN
        const newRefreshToken = uuidv4()

        // UPDATE USER REFRESH TOKEN
        await prisma.user.update({
            where: {
                userId: user.userId,
            },
            data: {
                refreshToken: newRefreshToken,
            },
        })

        return NextResponse.json({ accessToken: newAccessToken, refreshToken: newRefreshToken }, { status: 200 })
        
    } catch (error) {
        
        return NextResponse.json(
            {
                error: true,
                message: 'Token güncellenirken bir hata oluştu',
                details: error.message
            }, 
            {status: 500}
        )
    }
}