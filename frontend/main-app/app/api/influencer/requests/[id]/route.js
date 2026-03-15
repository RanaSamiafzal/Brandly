import { NextResponse } from 'next/server';
import { AuthService, RequestService, RequestRepository } from '@repo/core';

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const request = await RequestRepository.findById(id);

        if (!request) {
            return NextResponse.json({ error: 'Collaboration not found' }, { status: 404 });
        }

        // Security check: only part of the collab can see it
        if (request.senderId !== decoded.userId && request.receiverId !== decoded.userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        return NextResponse.json({ request });
    } catch (error) {
        console.error('Fetch collaboration detail error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PATCH(req, { params }) {
    try {
        const { id } = await params;
        const { status } = await req.json(); // ACCEPTED, REJECTED, etc.

        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        // Note: RequestService should handle security/ownership of the request
        const updatedRequest = await RequestService.respondToRequest(id, status, decoded.userId);

        return NextResponse.json({ request: updatedRequest });
    } catch (error) {
        console.error('Request response error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
