import { cookies } from "next/headers";
import { NextResponse } from "next/server"
import { VerifyJwt } from "./app/utils/session";
import { v4 as uuidv4 } from 'uuid';

export async function middleware(req){
    const {pathname} = req.nextUrl

    if (pathname.startsWith('/api') || pathname.startsWith('/_next')) {
        return NextResponse.next();
    }

    const {value: token} = req.cookies.get('token') ?? {value: null}
    console.log(pathname)
   
    // Token kontrolü her zaman yapılır
    const payload = await VerifyJwt(token)
    
    // Token yok ise
    if(!payload)
    {
        const userID = uuidv4()
        const response = await fetch("http://localhost:3000/api/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userID })
        })
        
        if (response.ok) {
            const data = await response.json();
            const newToken = data.token;

            // Yeni NextResponse oluştur ve cookie'yi ayarla
            const res = NextResponse.next();
            res.cookies.set('token', newToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: '/',
                maxAge: 7200,
            });
            return res;
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/:language/:practice',
}