import { getSecretKey } from "@/app/utils/session";
import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Burada accessToken ve refreshToken oluşturma işlemi gerçekleştirilecek
export async function GET(request) {    

    try {
        // Secret key alınır
        const secretKey = getSecretKey();

        const userID = uuidv4()

        // accessToken oluşturulur
        const accessToken = await new SignJWT({ userId: userID })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('5m')
            .sign(secretKey);

        // refreshToken oluşturulur
        const refreshToken = uuidv4();

        return NextResponse.json({accessToken, refreshToken, userID}, {status: 200})

    } catch (error) {

        console.error(error)
        return NextResponse.json({message: 'Token oluşturma hatası', error: error.message}, {status: 500})
    }
}

export async function PUT(request) {

    try {
        
        // refreshToken bilgisi alınır
        const rt = String(request.headers.get('X-Refresh-Token'))

        // User tablosunda userId alanı userId olan kayıtın refreshToken alanı karşılaştırılır
        const user = await prisma.user.findFirst({
            where: {
                refreshToken: rt
            }
        })

        if(user.refreshToken == rt)
        {
            // Secret key alınır
            const secretKey = getSecretKey();

            // accessToken oluşturulur
            const newAccessToken = await new SignJWT({ userId: user.userId })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('5m')
                .sign(secretKey);

            // refreshToken oluşturulur
            const newRefreshToken = uuidv4();

            await prisma.user.update({
                where: {
                    userId: user.userId,
                },
                data: {
                    refreshToken: newRefreshToken,
                },
            });

            const res = NextResponse.json({ accessToken: newAccessToken, refreshToken: newRefreshToken }, { status: 200 });
            
            return res
        }


    } catch (error) {
        
        console.error(error)
        return NextResponse.json({message: 'Token güncelleme hatası', error: error.message}, {status: 500})
    }
}