import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:7878';

export async function GET() {
    try {
        // Get latest recap from database (highest id)
        const response = await fetch(`${BACKEND_URL}/recap/latest`);
        
        if (response.ok) {
            const data = await response.json();
            if (data) {
                return NextResponse.json({
                    recap: data.recap,
                    week: data.week_number,
                    year: data.year,
                    generatedAt: data.generated_at,
                    cached: true
                });
            }
        }

        // No recap found
        return NextResponse.json({
            recap: null,
            cached: false
        });
    } catch (error) {
        console.error('Error fetching recap:', error);
        return NextResponse.json(
            { error: `Failed to fetch recap: ${error}` },
            { status: 500 }
        );
    }
}
