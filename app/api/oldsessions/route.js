import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { getSecretKey } from '@/app/lib/jwt'
import { prisma } from '@/app/lib/prisma'


export async function GET(req){

    try {

        const token = req.headers.get('Authorization')

        if(token != null)
        {
            const { payload } = await jwtVerify(token, getSecretKey())
            
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

            return NextResponse.json({ sessions }, { status: 200 })
        }

        return NextResponse.json({message: 'Unauthorized'}, {status: 401})

    } catch (error) {
        return NextResponse.json(
        {
            error: true,
            message: 'Old sessions could not be fetched',
            details: error.message
        },
        { status: 500 })
    }
}
