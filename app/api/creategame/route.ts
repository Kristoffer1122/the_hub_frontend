export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        const response = await fetch("http://localhost:7878/creategame", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const text = await response.text();
        return new Response(text, { status: response.status });
    } catch (error) {
        console.error("API route error:", error);
        return new Response(JSON.stringify({ error: String(error) }), { 
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
