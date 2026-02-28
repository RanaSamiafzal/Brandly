import { NextResponse } from 'next/server';
import { AuthService, ActivityService } from '@repo/core';

// PATCH /api/notifications/read-all
export async function PATCH(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        await ActivityService.markAllAsRead(decoded.userId);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Mark all read error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
