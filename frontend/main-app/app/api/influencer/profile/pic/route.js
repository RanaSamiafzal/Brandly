import { NextResponse } from 'next/server';
import { AuthService, InfluencerService } from '@repo/core';

export async function PATCH(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const { profilePic } = await req.json();
        if (!profilePic) return NextResponse.json({ error: 'Profile picture URL is required' }, { status: 400 });

        const updatedProfile = await InfluencerService.updateInfluencerProfile(decoded.userId, {
            profilePic: profilePic
        });

        return NextResponse.json({ success: true, profile: updatedProfile });
    } catch (error) {
        console.error('Update profile pic error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
