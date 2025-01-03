import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET(request) {

  try {

    const practices = await prisma.practice.findMany()
    return NextResponse.json(practices, { status: 200 })

  } catch (error) {

    return NextResponse.json(
      { 
        error: true, 
        message: 'Practice verileri alınırken bir hata oluştu', 
        details: error.message 
      },
      { status: 500 }
    )
  }
}