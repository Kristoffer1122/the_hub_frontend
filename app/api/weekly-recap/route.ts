import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const { DefaultAzureCredential } = require('@azure/identity');
        
        const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
        const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;

        if (!endpoint || !deploymentName) {
            return NextResponse.json(
                { error: 'Missing Azure AI configuration. Please set AZURE_OPENAI_ENDPOINT and AZURE_OPENAI_DEPLOYMENT_NAME in .env.local' },
                { status: 500 }
            );
        }

        const currentDate = new Date();
        const weekNumber = getWeekNumber(currentDate);

        const prompt = `Generate a weekly recap for week ${weekNumber} of ${currentDate.getFullYear()}. 
        Include:
        - Key highlights of the week
        - Important tasks completed
        - Upcoming goals for next week
        - Motivational message
        
        Keep it concise and engaging (max 200 words).`;

        // Get Azure AD token
        const credential = new DefaultAzureCredential();
        const tokenResponse = await credential.getToken("https://ai.azure.com/.default");

        // Use the published Responses API endpoint
        const url = `${endpoint}/applications/${deploymentName}/protocols/openai/responses?api-version=2025-11-15-preview`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenResponse.token}`
            },
            body: JSON.stringify({
                input: prompt
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Azure OpenAI API error:', errorData);
            console.error('Request URL:', url);
            return NextResponse.json(
                { error: `Failed to generate recap from Azure AI: ${errorData}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        
        // Extract text from the message output
        const messageOutput = data.output?.find((item: any) => item.type === 'message');
        const textContent = messageOutput?.content?.find((c: any) => c.type === 'output_text');
        const recap = textContent?.text || 'No recap generated';

        return NextResponse.json({
            recap,
            week: weekNumber,
            year: currentDate.getFullYear(),
            generatedAt: currentDate.toISOString()
        });
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
