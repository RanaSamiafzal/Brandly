import { NextResponse } from 'next/server';
import { AuthService, BrandService } from '@repo/core';

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const profile = await BrandService.getBrandById(id);

        if (!profile) {
            return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
        }

        return NextResponse.json({ profile });
    } catch (error) {
        console.error('Brand profile fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
