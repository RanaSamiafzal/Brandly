import { NextResponse } from 'next/server';
import { AuthService, CampaignService } from '@repo/core';

export async function PATCH(req, { params }) {
    try {
        const { id } = await params;
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'BRAND') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const body = await req.json();
        const { resources } = body;

        if (!Array.isArray(resources)) {
            return NextResponse.json({ error: 'Resources must be an array' }, { status: 400 });
        }

        const updatedCampaign = await CampaignService.updateCampaignResources(id, resources);

        return NextResponse.json({ success: true, campaign: updatedCampaign });
    } catch (error) {
        console.error('Update campaign resources error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
