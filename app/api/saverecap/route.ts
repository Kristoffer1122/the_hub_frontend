import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:7878';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        const response = await fetch(`${BACKEND_URL}/saverecap`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        
        const text = await response.text();
        return NextResponse.json({ message: text }, { status: response.status });
    } catch (error) {
        console.error('Error saving recap to backend:', error);
        return NextResponse.json({ error: 'Failed to save recap' }, { status: 500 });
    }
}
