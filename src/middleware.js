import { NextResponse } from 'next/server'

export async function middleware(req) {
    const response = NextResponse.next()
    const token = req.cookies.has(process.env.NODE_ENV === "development" ? 'next-auth.session-token' : '__Secure-next-auth.session-token')

    if (req.nextUrl.pathname.indexOf("api") !== -1) {
        response.headers.set('Authorization', token);
    } else {
        if (req.nextUrl.pathname === "/login" ? token : !token) {
            return NextResponse.redirect(new URL(req.nextUrl.pathname === "/login" ? '/' : '/login', req.url));
        }
    }

    return response
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|img|favicon.ico).*)',
    ],
}