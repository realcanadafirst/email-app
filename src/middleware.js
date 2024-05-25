import { NextResponse } from 'next/server';

export function middleware(req) {
    const { pathname } = req.nextUrl;
    const response = NextResponse.next();
    if (pathname.startsWith('/api/v1')) {
        const token = req.headers.get('access-token');
        const hash = req.headers.get('userhash');
        if (token && hash) {
            const valid_token = false;
            if(valid_token){
                return response;
            } else {
                return new NextResponse('Unauthorized', { status: 401 });
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