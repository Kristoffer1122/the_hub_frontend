export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    const body = await request.json();

    const response = await fetch(`http://localhost:7878/games/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const text = await response.text();
    return new Response(text, { status: response.status });
}
