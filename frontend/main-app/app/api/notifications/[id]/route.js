import { NextResponse } from 'next/server';
import { AuthService, ActivityService } from '@repo/core';
import { ActivityRepository } from '@repo/database/repositories/activity-repository.js';

// PATCH /api/notifications/[id]  — mark single as read
// DELETE /api/notifications/[id] — delete single notification
export async function PATCH(req, { params }) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const { id } = await params;

        // Verify ownership
        const activity = await ActivityRepository.findById(id);
        if (!activity || activity.userId !== decoded.userId) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        const updated = await ActivityService.markAsRead(id);
        return NextResponse.json({ notification: updated });
    } catch (error) {
        console.error('Mark read error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const { id } = await params;

        // Verify ownership
        const activity = await ActivityRepository.findById(id);
        if (!activity || activity.userId !== decoded.userId) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        await ActivityService.deleteActivity(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete notification error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
