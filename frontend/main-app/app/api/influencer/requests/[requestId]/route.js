import { NextResponse } from 'next/server';
import { AuthService, RequestService } from '@repo/core';

export async function PATCH(req, { params }) {
    try {
        const { requestId } = params;
        const { status } = await req.json(); // ACCEPTED, REJECTED, etc.

        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const updatedRequest = await RequestService.respondToRequest(requestId, status, decoded.userId);

        return NextResponse.json({ request: updatedRequest });
    } catch (error) {
        console.error('Request response error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
