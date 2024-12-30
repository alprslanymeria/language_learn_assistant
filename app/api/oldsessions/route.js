import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { getSecretKey } from '@/app/utils/session';

const prisma = new PrismaClient();

export async function GET(req){

    try {

        //Burada hangi kullanıcı olduğu bilgisi cookie ile birlikte gönderilen token bilgisi üzerinden alınır
        const token = req.headers.get('Authorization')

        // Burada süre bilgisi kontrol edilir eğer geçmiş ise unauthorized döner
        if(token != null)
        {
            const { payload } = await jwtVerify(token, getSecretKey());
            

            if(!payload)
            {
                return NextResponse.json({message: 'Unauthorized'}, {status: 401})
            }

            const userId = payload.userId
            const url = new URL(req.url)
            const language = url.searchParams.get("language")
            const practice = url.searchParams.get("practice")


            const sessions = await prisma.oldSessions.findMany({
                where: {
                    userId: userId,
                    languageId: language,
                    practiceId: practice,
                }
            })

            if (!sessions || sessions.length === 0)
                return NextResponse.json({ message: 'No sessions found' }, { status: 404 })

            return NextResponse.json({ sessions }, { status: 200 });
        }

        return NextResponse.json({message: 'Unauthorized'}, {status: 401})

    } catch (error) {
        
        console.error(error); // Log the actual error
        return NextResponse.json({ message: 'Error retrieving data', error: error.message }, { status: 500 });
    }
}
