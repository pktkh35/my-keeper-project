import { NextResponse } from 'next/server'

export async function middleware(req) {
    const token = req.cookies.has(process.env.NODE_ENV === "development" ? 'next-auth.session-token' : '__Secure-next-auth.session-token')

    if (req.nextUrl.pathname === "/login" ? token : !token) {
        return NextResponse.redirect(new URL(req.nextUrl.pathname === "/login" ? '/' : '/login', req.url));
    }

    const response = NextResponse.next()

    return response
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|img|favicon.ico).*)',
    ],
}