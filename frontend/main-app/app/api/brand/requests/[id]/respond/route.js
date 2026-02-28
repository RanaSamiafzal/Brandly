import { NextResponse } from 'next/server';
import { AuthService, RequestService } from '@repo/core';

export async function POST(req, { params }) {
    try {
        const { id } = params;
        const { status } = await req.json(); // ACCEPTED or REJECTED

        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        if (!['ACCEPTED', 'REJECTED'].includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        const updatedRequest = await RequestService.respondToRequest(id, status, decoded.userId);

        return NextResponse.json({ message: `Request successfully ${status.toLowerCase()}`, request: updatedRequest });
    } catch (error) {
        console.error('Request responding error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
