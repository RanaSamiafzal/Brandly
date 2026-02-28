import { NextResponse } from 'next/server';
import { AuthService, ActivityService } from '@repo/core';

export async function GET(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        // Fetch recent activities
        const activities = await ActivityService.getUserActivities(decoded.userId, 10);

        return NextResponse.json({ activities });
    } catch (error) {
        console.error('Activity fetching error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
