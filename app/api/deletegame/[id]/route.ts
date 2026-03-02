export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    
    const response = await fetch(`http://localhost:7878/deletegame/${id}`, {
        method: "POST",
    });

    return new Response(null, { status: response.status });
}
