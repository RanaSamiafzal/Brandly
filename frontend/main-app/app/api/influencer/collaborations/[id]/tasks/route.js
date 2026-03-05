import { NextResponse } from 'next/server';
import { AuthService, CollaborationService } from '@repo/core';

export async function GET(req, { params }) {
    try {
        const { id: requestId } = await params;

        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const tasks = await CollaborationService.getCollabTasks(requestId);

        return NextResponse.json({ tasks });
    } catch (error) {
        console.error('Fetch tasks error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req, { params }) {
    try {
        const { id: requestId } = await params;

        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const textBody = await req.text();
        const data = textBody ? JSON.parse(textBody) : {};
        if (!data.title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

        const task = await CollaborationService.addCollabTask({
            requestId,
            title: data.title,
            description: data.description || '',
            dueDate: data.dueDate ? new Date(data.dueDate) : null
        });

        return NextResponse.json({ task }, { status: 201 });
    } catch (error) {
        console.error('Create task error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
