import { NextResponse } from 'next/server';
import { AuthService, ActivityService } from '@repo/core';

export async function PATCH(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        await ActivityService.markAllAsRead(decoded.userId);

        return NextResponse.json({ message: 'All notifications marked as read' });
    } catch (error) {
        console.error('Notifications read error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
