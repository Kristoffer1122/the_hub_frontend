export async function GET() {
    const response = await fetch("http://localhost:7878/getgames");
    const data = await response.json();
    return Response.json(data);
}
