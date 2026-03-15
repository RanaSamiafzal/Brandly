import { NextResponse } from 'next/server';
import { AuthService } from '@repo/core';
import { RequestRepository } from '@repo/database/repositories/request-repository.js';

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'BRAND') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const request = await RequestRepository.findById(id);

        if (!request) {
            return NextResponse.json({ error: 'Collaboration not found' }, { status: 404 });
        }

        // Security check
        if (request.campaign.brand.userId !== decoded.userId && request.senderId !== decoded.userId && request.receiverId !== decoded.userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        return NextResponse.json({ request });
    } catch (error) {
        console.error('Fetch brand request error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
