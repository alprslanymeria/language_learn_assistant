import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {

  try {
    const languages = await prisma.language.findMany();
    return NextResponse.json(languages, { status: 200 });

  } catch (error) {

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
