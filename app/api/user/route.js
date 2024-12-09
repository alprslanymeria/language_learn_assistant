import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers'

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { userId } = await request.json();
    
    // Kullanıcı oluşturulur
    const newUser = await prisma.user.create({
      data: {
        userId: userId,
      },
    });
    
    const secretKey = new TextEncoder().encode(process.env.SECRET_KEY || 'fallback-secret');
    
    // Token oluşturulur
    const jwt = await new SignJWT({ userId: userId })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(secretKey);
    
    return NextResponse.json({newUser, token: jwt}, {status: 201})
  } catch (error) {
    console.error(error); // Log the actual error
    return NextResponse.json({ message: 'Error creating user', error: error.message }, { status: 500 });
  }
}