import { NextResponse } from 'next/server';
import { AuthService, UserRepository } from '@repo/core';

export async function GET(req) {
    try {
        const token = req.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        const decoded = AuthService.validateToken(token);
        if (!decoded) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            );
        }

        // Fetch the latest user info from DB including profiles
        const user = await UserRepository.findById(decoded.userId);

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Return full user data for frontend store
        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                fullname: user.fullname,
                role: user.role?.name || 'USER', // Defensive check
                profilePic: user.profilePic,
                coverPic: user.coverPic,
                brandProfile: user.brandProfile,
                influencerProfile: user.influencerProfile
            }
        });
    } catch (error) {
        console.error('Session error detailed:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
