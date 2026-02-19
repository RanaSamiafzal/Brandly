export function checkAuth(role, cookies) {
    // In a real app, verify session/token here
    // This helper can be used in Server Components
    const isAuthenticated = cookies?.get('auth_status')?.value === 'true' || false;
    const userRole = cookies?.get('user_role')?.value || null;

    if (!isAuthenticated) return { authorized: false, redirect: '/signin' };
    if (role && userRole !== role) return { authorized: false, redirect: '/' };

    return { authorized: true };
}
