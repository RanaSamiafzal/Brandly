import { NextResponse } from 'next/server';
import { AuthService, RequestService } from '@repo/core';

export async function POST(req, { params }) {
    try {
        const { id: requestId } = await params;
        const token = req.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'BRAND') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const body = await req.json();
        const { status } = body;

        if (!['ACCEPTED', 'REJECTED'].includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        const updatedRequest = await RequestService.respondToRequest(
            requestId,
            status,
            decoded.userId
        );

        return NextResponse.json({ success: true, request: updatedRequest });
    } catch (error) {
        console.error('Respond to request error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
