import { NextResponse } from 'next/server';
import { AuthService, ActivityService } from '@repo/core';

export async function GET(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const notifications = await ActivityService.getUserActivities(decoded.userId, 20);

        return NextResponse.json({ notifications });
    } catch (error) {
        console.error('Notifications fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
