import { NextResponse } from 'next/server';
import { AuthService, RequestService } from '@repo/core';

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const token = req.cookies.get('token')?.value;

        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const { RequestRepository } = await import('@repo/database/repositories/request-repository.js');
        const request = await RequestRepository.findById(id);

        if (!request) return NextResponse.json({ error: 'Request not found' }, { status: 404 });

        // Security: Ensure brand is allowed to see this
        if (decoded.role === 'BRAND' && request.receiverId !== decoded.userId && request.senderId !== decoded.userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        return NextResponse.json({ request });
    } catch (error) {
        console.error('Fetch request detail error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
