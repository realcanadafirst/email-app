import { NextResponse } from 'next/server'
export function middleware(req) {
    // Check the origin from the request
    const { pathname } = req.nextUrl;
    const token = false;
    const response = NextResponse.next();
    if (pathname.startsWith('/api/v1')) {
        if (token) {
            return response;
        } else {
            return new NextResponse('Unauthorized', { status: 401 });
        }
    }
    return response;
}

export const config = {
    matcher: '/api/:path*',
}