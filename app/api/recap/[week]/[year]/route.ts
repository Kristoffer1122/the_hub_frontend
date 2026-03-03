import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:7878';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ week: string; year: string }> }
) {
    const { week, year } = await params;
    
    try {
        const response = await fetch(`${BACKEND_URL}/recap/${week}/${year}`);
        
        if (response.status === 404) {
            return NextResponse.json({ found: false }, { status: 200 });
        }
        
        const data = await response.json();
        return NextResponse.json({ found: true, ...data });
    } catch (error) {
        console.error('Error fetching recap from backend:', error);
        return NextResponse.json({ error: 'Failed to fetch recap' }, { status: 500 });
    }
}
