import { NextResponse } from 'next/server';
import { AuthService, BrandService } from '@repo/core';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('query');
        const industry = searchParams.get('industry');

        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const decoded = AuthService.validateToken(token);
        if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const brands = await BrandService.searchBrands({ query, industry });

        return NextResponse.json({ brands });
    } catch (error) {
        console.error('Brand search error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
