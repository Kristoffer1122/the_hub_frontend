import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:7878';

export async function GET() {
    try {
        const currentDate = new Date();
        const weekNumber = getWeekNumber(currentDate);
        const year = currentDate.getFullYear();

        // Get cached recap from the database
        const cachedResponse = await fetch(`${BACKEND_URL}/recap/${weekNumber}/${year}`);
        if (cachedResponse.ok) {
            const cachedData = await cachedResponse.json();
            if (cachedData) {
                return NextResponse.json({
                    recap: cachedData.recap,
                    week: cachedData.week_number,
                    year: cachedData.year,
                    generatedAt: cachedData.generated_at,
                    cached: true
                });
            }
        }

        // No cached recap found
        return NextResponse.json(
            { error: 'No recap available for this week. Generate one first.' },
            { status: 404 }
        );
    } catch (error) {
        console.error('Error fetching weekly recap:', error);
        return NextResponse.json(
            { error: `Failed to fetch weekly recap: ${error}` },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { azure_token } = body;

        if (!azure_token) {
            return NextResponse.json(
                { error: 'Missing azure_token in request body' },
                { status: 400 }
            );
        }

        // Call backend to generate recap
        const response = await fetch(`${BACKEND_URL}/generate-recap`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ azure_token })
        });

        const result = await response.text();

        if (!response.ok) {
            return NextResponse.json(
                { error: result },
                { status: response.status }
            );
        }

        return NextResponse.json({ message: result });
    } catch (error) {
        console.error('Error generating weekly recap:', error);
        return NextResponse.json(
            { error: `Failed to generate weekly recap: ${error}` },
            { status: 500 }
        );
    }
}

function getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}
