import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET(request) {

  try {
    const { searchParams } = new URL(request.url)
    const language = searchParams.get('language')

    const films = await prisma.film.findMany({
      where: {
        languageId: language
      }
    })
    return NextResponse.json(films, { status: 200 })

  } catch (error) {

    return NextResponse.json(
      {
        error: true,
        message: 'Film verileri alınırken bir hata oluştu',
        details: error.message,
      },
      { status: 500 }
    )
  }
}