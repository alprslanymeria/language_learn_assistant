import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET(request) {

  try {

    const { searchParams } = new URL(request.url)
    const what = searchParams.get('what')
    const language = searchParams.get('language')

          // FOR WRITING
          if(what == 'Writing')
          {
            const books = await prisma.book.findMany({
              where: {
                languageId: "turkish"
            }})
            return NextResponse.json(books, { status: 200 })
          }

          // FOR READING
          const books = await prisma.book.findMany({
            where: {
              languageId: language
          }})
          return NextResponse.json(books, { status: 200 })

  } catch (error) {

    return NextResponse.json(
      {
        error: true,
        message: 'Book verileri alınırken bir hata oluştu',
        details: error.message,
      },
      { status: 500 }
    )
  }
}