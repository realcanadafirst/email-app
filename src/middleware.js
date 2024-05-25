import { NextResponse } from 'next/server';
import { validateToken } from '@ft/lib/authToken';

export async function middleware(req) {
    const { pathname } = req.nextUrl;
    const response = NextResponse.next();
    if (pathname.startsWith('/api/v1')) {
        const access_token = req.headers.get('access_token');
        const user_hash = req.headers.get('user_hash');
        if (access_token && user_hash) {
            const valid_token = await fetch(`${req.nextUrl.origin}/api/auth/verify`, { headers: { access_token, user_hash } });
            if (!valid_token.ok) {
                return new NextResponse('Unauthorized', { status: 401 });
            } else {
                return response;
            }
        } else {
            return new NextResponse('Unauthorized', { status: 401 });
        }
    }
    return response;
}

export const config = {
    matcher: '/api/:path*',
}