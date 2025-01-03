import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

const BASE = process.env.NEXT_PUBLIC_API_URL

export async function POST(request) {
      
  try {

      // CREATE TOKEN FOR USER
      const response = await fetch(`${BASE}/api/token`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',}
        })

      const { accessToken , refreshToken, userID} = await response.json()

      // CREATE NEW USER
      const newUser = await prisma.user.create({
        data: {
          userId: userID,
          refreshToken: refreshToken,
        },
      })
      
      return NextResponse.json({newUser, accessToken: accessToken, refreshToken: refreshToken}, {status: 200})

  } catch (error) {
        
      return NextResponse.json(
        {
          error: true,
          message: 'User oluşturulurken bir hata oluştu',
          details: error.message
        },
        { status: 500 }
      )
  }
}