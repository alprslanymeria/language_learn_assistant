import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET(request) 
{
  try {

      const userId = request.headers.get('X-User-Id')
      const sessionId = request.headers.get('X-Session-Id')

      const user = await prisma.liveSessions.findFirst({
        where: {
          userId: userId,
          liveSessionId: sessionId
        }
      })

      if(!user)
      {
        return NextResponse.json({message: 'Kullanıcı bulunamadı'}, {status: 404})
      }
      
      return NextResponse.json({status: 200})

  } catch (error) {
    
      return NextResponse.json(
        {
          error: true,
          message: 'Session bilgisi karşılaştırılırken bir hata oluştu',
          details: error.message
        },
        { status: 500 })
  }
}

export async function POST(request) {

    try {

        const userId = request.headers.get('X-User-Id')
        const sessionId = request.headers.get('X-Session-Id')

        const user = await prisma.liveSessions.create({
            data: {
                userId: userId,
                liveSessionId: sessionId,
            }
        })

        return NextResponse.json({ message: 'Session created' }, { status: 200 })
        
    } catch (error) {
        
        return NextResponse.json(
            {
                error: true,
                message: 'Session oluşturulurken bir hata oluştu',
                details: error.message
            },
            { status: 500 }
        )
    }
}