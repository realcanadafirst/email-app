import { NextResponse } from 'next/server';

export async function middleware(req) {
    const { pathname } = req.nextUrl;
    const response = NextResponse.next();
    if (pathname.startsWith('/api/v1')) {
        console.log(req.headers)
        const access_token = req.headers.get('accesstoken');
        const user_hash = req.headers.get('userhash');
        if (access_token && user_hash) {
            const valid_token = await fetch(`${req.nextUrl.origin}/api/auth/verify`, { headers: { access_token, user_hash } });
            if (!valid_token.ok) {
                return new NextResponse(access_token+'__'+user_hash, { status: 401 });
            } else {
                return response;
            }
        } else {
            return new NextResponse(access_token+'__'+user_hash, { status: 401 });
        }
    }
    return response;
}

export const config = {
    matcher: '/api/:path*',
}