import { NextResponse } from 'next/server';

export async function middleware(req) {
    const { pathname } = req.nextUrl;
    const response = NextResponse.next();
    if (pathname.startsWith('/api/v1')) {
        const accesstoken = req.headers.get('accesstoken');
        const userhash = req.headers.get('userhash');
        if (accesstoken && userhash) {
            const valid_token = await fetch(`${req.nextUrl.origin}/api/auth/verify`, { headers: { accesstoken, userhash } });
            if (!valid_token.ok) {
                return new NextResponse(accesstoken+'__'+userhash, { status: 401 });
            } else {
                return response;
            }
        } else {
            return new NextResponse(accesstoken+'__'+userhash, { status: 401 });
        }
    }
    return response;
}

export const config = {
    matcher: '/api/:path*',
}