import { NextResponse } from 'next/server';

export async function proxy(request) {
    const { pathname } = request.nextUrl;

    // Define protected routes and their required roles
    const protectedRoutes = {
        '/admin': 'ADMIN',
        '/brand': 'BRAND',
        '/influencer': 'INFLUENCER',
    };

    // Check if the current path starts with any of the protected routes
    const protectedPath = Object.keys(protectedRoutes).find(path => pathname.startsWith(path));

    if (protectedPath) {
        // We use the actual token now instead of fake cookies
        const token = request.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            // We can't use 'jsonwebtoken' in Edge Runtime easily, so we parse the payload manually
            // A JWT is header.payload.signature
            const payloadPart = token.split('.')[1];
            // atob is available in edge runtime
            const decodedPayload = JSON.parse(atob(payloadPart));
            const userRole = decodedPayload.role;

            const requiredRole = protectedRoutes[protectedPath];
            if (requiredRole && userRole !== requiredRole) {
                // If they are logged in but don't have the right role, send to home
                return NextResponse.redirect(new URL('/', request.url));
            }
        } catch (error) {
            // Invalid token
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/admin/:path*', '/brand/:path*', '/influencer/:path*'],
};
