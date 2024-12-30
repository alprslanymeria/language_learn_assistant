import { cookies } from "next/headers";
import { NextResponse } from "next/server"
import { VerifyJwt } from "./app/utils/session";
import { v4 as uuidv4 } from 'uuid';

export async function middleware(req){
    const {pathname} = req.nextUrl

    if (pathname.startsWith('/api') || pathname.startsWith('/_next')) {
        return NextResponse.next();
    }

    // Token bilgisi alınır
    const {value: accessToken} = req.cookies.get('accessToken') ?? {value: null}
    const {value: refreshToken} = req.cookies.get('refreshToken') ?? {value: null}
    console.log(pathname)
   
    // Token kontrolü her zaman yapılır (Tokenin gerçek bir JWT olup olmadığı kontrol edilir)
    const payload = await VerifyJwt(accessToken)

    // Token expire olmuş ise
    if(payload && payload.error === 'expired')
    {
        const res = await fetch("http://localhost:3000/api/token", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken,
                'X-Refresh-Token': refreshToken,
            },
            credentials: 'include',
        })

        const data = await res.json();
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        const response = NextResponse.next();

        response.cookies.set('accessToken', newAccessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/',
            maxAge: 31536000, // 2 hours
        });
        response.cookies.set('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/',
            maxAge: 31536000, // 1 year
        });

        return response;
    }
    
    // Token yok veya geçerli değil ise
    if(!payload)
    {
        const response = await fetch("http://localhost:3000/api/user", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        
        if (response.ok) {
            const data = await response.json();
            const accessToken = data.accessToken;
            const refreshToken = data.refreshToken;

            // Yeni NextResponse oluştur ve cookie'yi ayarla
            const res = NextResponse.next();
            res.cookies.set('accessToken', accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: '/',
                maxAge: 31536000,
            });
            res.cookies.set('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: '/',
                maxAge: 31536000, // 1 year
            });
            return res;
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/:language/:practice',
}