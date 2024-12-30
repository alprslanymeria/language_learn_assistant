import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers'
import { getSecretKey } from '@/app/utils/session';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
  

    const response = await fetch("http://localhost:3000/api/token", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',}
      
      });

    const { accessToken , refreshToken, userID} = await response.json();

    // Kullanıcı oluşturulur
    const newUser = await prisma.user.create({
      data: {
        userId: userID,
        refreshToken: refreshToken,
      },
    })
    
    return NextResponse.json({newUser, accessToken: accessToken, refreshToken: refreshToken}, {status: 200})
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Kullanıcı oluşturmada beklenmedik hata', error: error.message }, { status: 500 });
  }
}