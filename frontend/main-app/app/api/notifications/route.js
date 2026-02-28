import { NextResponse } from 'next/server';
import { AuthService, ActivityService } from '@repo/core';

// GET /api/notifications?filter=all|unread|read&search=query&limit=50
export async function GET(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const { searchParams } = new URL(req.url);
        const filter = searchParams.get('filter') || 'all';
        const search = searchParams.get('search') || '';
        const limit = parseInt(searchParams.get('limit') || '50');

        let notifications;
        if (search) {
            notifications = await ActivityService.searchActivities(decoded.userId, search);
        } else {
            const filterArg = filter === 'unread' ? 'unread' : filter === 'read' ? 'read' : null;
            notifications = await ActivityService.getUserActivities(decoded.userId, limit, filterArg);
        }

        // Always get TRUE unread count for the user
        const allUnread = await ActivityService.getUserActivities(decoded.userId, 100, 'unread');
        const unreadCount = allUnread.length;

        return NextResponse.json({ notifications, unreadCount });
    } catch (error) {
        console.error('Notifications fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
