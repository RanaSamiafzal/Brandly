import { NextResponse } from 'next/server';

export function proxy(request) {
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
        // In a real app, you would check for a cookie or token
        // For now, we simulate authentication status
        const isAuthenticated = request.cookies.get('auth_status')?.value === 'true';
        const userRole = request.cookies.get('user_role')?.value; // e.g., 'BRAND', 'ADMIN', etc.

        if (!isAuthenticated) {
            return NextResponse.redirect(new URL('/signin', request.url));
        }

        const requiredRole = protectedRoutes[protectedPath];
        if (requiredRole && userRole !== requiredRole) {
            // If they are logged in but don't have the right role, send to home
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/admin/:path*', '/brand/:path*', '/influencer/:path*'],
};
