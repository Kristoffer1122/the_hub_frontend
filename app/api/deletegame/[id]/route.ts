const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:7878';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    
    const response = await fetch(`${BACKEND_URL}/deletegame/${id}`, {
        method: "POST",
    });

    return new Response(null, { status: response.status });
}
