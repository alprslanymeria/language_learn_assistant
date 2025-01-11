import { NextResponse } from "next/server"
import { cookies } from "next/headers";
import { decrypt } from "./app/lib/session";
import { decrypt as decryptCrypto } from "./app/lib/crypto";
import { checkLiveSession } from "./actions/liveSession";

const BASE = process.env.NEXT_PUBLIC_API_URL

const protectedRoutes = ["/create", "/session", "/lang"];
const publicRoutes = ["/login", "/signup"];

export default async function middleware(req){

    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
    const isPublicRoute = publicRoutes.some(route => path.startsWith(route));

    if(path.startsWith("/api") || path.startsWith("/_next") || path.startsWith("/favicon.ico"))
    {
        return NextResponse.next()
    }

    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    if(path.startsWith("/session") && session)
    {
        const encryptedSessionId = req.nextUrl.searchParams.get("id");
        const sessionId = decryptCrypto(encryptedSessionId)
        const userId = session.userId;

        const response = await fetch(`${BASE}/api/compare?sessionId=${sessionId}&userId=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(response.status != 200)
        {
            return NextResponse.redirect("http://localhost:3000/")
        }

        return NextResponse.next()
    }

    if(isProtectedRoute && !session)
    {
        return NextResponse.redirect("http://localhost:3000/login");
    }

    if(isPublicRoute && session)
    {
        return NextResponse.redirect("http://localhost:3000/");
    }

    

    return NextResponse.next();
}

