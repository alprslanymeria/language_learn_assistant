import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {

  try {
    const books = await prisma.book.findMany();
    return NextResponse.json(books, { status: 200 });

  } catch (error) {

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}