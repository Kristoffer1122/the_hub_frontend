const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:7878';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/games/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const text = await response.text();
    return new Response(text, { status: response.status });
}
