import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req)
{
    try {

        const sessionId = req.nextUrl.searchParams.get('sessionId');
        const userId = req.nextUrl.searchParams.get('userId');
        
        const result = await prisma.liveSession.findFirst({
            where: {
                liveSessionId: sessionId,
                userId: userId
            }
        })

        if(!result)
        {
            return NextResponse.json(result, { status: 400 })
        }

        return NextResponse.json(result, { status: 200 })

    } catch (error) {
        
        return NextResponse.json(null, {status: 500})
    }
}