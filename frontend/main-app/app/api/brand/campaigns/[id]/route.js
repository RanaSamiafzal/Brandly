import { NextResponse } from 'next/server';
import { AuthService, BrandService, CampaignService } from '@repo/core';
import { CampaignRepository } from '@repo/database/repositories/campaign-repository.js';

/**
 * PATCH /api/brand/campaigns/[id]
 * Edit a campaign's details.
 */
export async function PATCH(req, { params }) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'BRAND') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const { id } = await params;
        const data = await req.json();

        // Verify ownership
        const profile = await BrandService.getBrandProfile(decoded.userId);
        const campaign = await CampaignRepository.findById(id);
        if (!campaign || campaign.brandId !== profile.id) {
            return NextResponse.json({ error: 'Campaign not found or access denied' }, { status: 404 });
        }

        // Only allow updating specific fields
        const allowedFields = ['title', 'description', 'budgetMin', 'budgetMax', 'targetCategory', 'targetPlatform', 'campaignTimeline', 'deliverables', 'targetAudience', 'additionalRequirements', 'status'];
        const updateData = {};
        for (const field of allowedFields) {
            if (data[field] !== undefined) updateData[field] = data[field];
        }

        const updated = await CampaignRepository.update(id, updateData);
        return NextResponse.json({ campaign: updated });
    } catch (error) {
        console.error('Campaign update error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

/**
 * DELETE /api/brand/campaigns/[id]
 * Soft-delete a campaign (sets isDeleted = true, deletedAt = now).
 */
export async function DELETE(req, { params }) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'BRAND') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const { id } = await params;

        // Verify ownership
        const profile = await BrandService.getBrandProfile(decoded.userId);
        const campaign = await CampaignRepository.findById(id);
        if (!campaign || campaign.brandId !== profile.id) {
            return NextResponse.json({ error: 'Campaign not found or access denied' }, { status: 404 });
        }

        await CampaignRepository.softDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Campaign delete error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
