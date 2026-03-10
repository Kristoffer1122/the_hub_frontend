import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:7878';

export async function GET() {
    try {
        // Get latest recap from database this week
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentWeek = Math.ceil(
            (now.getTime() - new Date(currentYear, 0, 1).getTime()) /
            (7 * 24 * 60 * 60 * 1000)
        );
        const response = await fetch(`${BACKEND_URL}/${currentWeek}/${currentYear}`);

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

