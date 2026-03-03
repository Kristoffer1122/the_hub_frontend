const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:7878';

export async function GET() {
    const response = await fetch(`${BACKEND_URL}/getgames`);
    const data = await response.json();
    return Response.json(data);
}
