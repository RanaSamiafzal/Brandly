import { NextResponse } from 'next/server';
import { AuthService } from '@repo/core';

export async function GET(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'INFLUENCER') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const { prisma } = await import('@repo/database');
        const campaigns = await prisma.campaign.findMany({
            where: {
                status: 'ACTIVE',
                isDeleted: false,
                deletedAt: null
            },
            include: {
                brand: {
                    include: {
                        user: {
                            select: { profilePic: true, fullname: true }
                        }
                    }
                },
                _count: {
                    select: { requests: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ campaigns });
    } catch (error) {
        console.error('Fetch campaigns error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
