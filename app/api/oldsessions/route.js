import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { getSecretKey } from '@/app/utils/session';

const prisma = new PrismaClient();

export async function GET(req){

    try {
        const {pathname} = req.nextUrl
        console.log(pathname)
        //Burada hangi kullanıcı olduğu bilgisi cookie ile birlikte gönderilen token bilgisi üzerinden alınır
        const token = req.headers.get('Authorization')
        
        if(token != null)
        {
            const { payload } = await jwtVerify(token, getSecretKey());
            console.log(payload.userId)
        }

        const url = new URL(req.url);
        const language = url.searchParams.get("language")
        const practice = url.searchParams.get("practice")
        return NextResponse.json({ language }, { status: 200 });

    } catch (error) {
        
        console.error(error); // Log the actual error
        return NextResponse.json({ message: 'Error retrieving data', error: error.message }, { status: 500 });
    }
}

/*

Veritabanında user tablosu - languages tablosu ve practices tablosu arasında bir ilişki olmalıdır.

User
Languages
    Birden fazla pratik e sahiptir

OldSessions tablosu olmalı
    userId --> session hangi kullanıcı yaptı
    language --> hangi dil için yaptı
    practice --> hangi pratik için yaptı
    CreatedOn --> session kapanış zamanı
    Rate --> session başarı yüzdesi

Session kapandığı zaman OldSession tablosuna veri eklenir
*/