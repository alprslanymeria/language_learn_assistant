import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET(request) {

  try {
    
    const languages = await prisma.language.findMany()
    return NextResponse.json(languages, { status: 200 })

  } catch (error) {

    return NextResponse.json(
      {
        error: true,
        message: 'Language verileri alınırken bir hata oluştu',
        details: error.message,
      },
      { status: 500 }
    )
  }
}