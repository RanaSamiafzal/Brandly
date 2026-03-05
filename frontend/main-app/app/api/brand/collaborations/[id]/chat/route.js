import { NextResponse } from 'next/server';
import { AuthService, CollaborationService } from '@repo/core';

export async function GET(req, { params }) {
    try {
        const { id: requestId } = await params;
        const token = req.cookies.get('token')?.value;

        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        // Optimization: Could check if user is part of this collaboration here

        const messages = await CollaborationService.getCollabMessages(requestId);
        return NextResponse.json({ messages });
    } catch (error) {
        console.error('Fetch messages error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
