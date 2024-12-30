import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {

  try {
    const films = await prisma.film.findMany();
    return NextResponse.json(films, { status: 200 });

  } catch (error) {

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}