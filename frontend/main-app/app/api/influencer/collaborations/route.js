import { NextResponse } from 'next/server';
import { AuthService, RequestService } from '@repo/core';

export async function GET(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded || decoded.role !== 'INFLUENCER') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const collaborations = await RequestService.getInfluencerRequests(decoded.userId);

        // Format for frontend
        const formatted = collaborations.map(col => {
            const tasks = col.tasks || [];
            const deliverablesTotal = tasks.length;
            const deliverablesCompleted = tasks.filter(t => t.status.toUpperCase() === 'COMPLETED').length;

            return {
                id: col.id,
                brandName: col.campaign?.brand?.brandName || "Brand",
                brandLogo: col.campaign?.brand?.logo || col.campaign?.brand?.user?.profilePic || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&h=200&fit=crop",
                brandId: col.campaign?.brand?.id,
                campaignTitle: col.campaign?.title || "Campaign",
                status: col.status.toLowerCase() === 'accepted' ? 'ongoing' : col.status.toLowerCase(),
                startDate: new Date(col.createdAt).toLocaleDateString(),
                endDate: col.campaign.campaignTimeline || "TBD",
                amount: col.proposedBudget || col.campaign.budgetMin,
                paymentStatus: col.status === 'ACCEPTED' ? 'pending' : 'not_started',
                deliverablesTotal,
                deliverablesCompleted,
                nextMilestone: tasks.find(t => t.status.toUpperCase() !== 'COMPLETED')?.title || "Initial Contact",
                deadline: tasks.find(t => t.status.toUpperCase() !== 'COMPLETED')?.dueDate ? new Date(tasks.find(t => t.status.toUpperCase() !== 'COMPLETED').dueDate).toLocaleDateString() : "TBD",
                priority: "medium"
            };
        });

        return NextResponse.json({ collaborations: formatted });
    } catch (error) {
        console.error('Fetch influencer collaborations error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
