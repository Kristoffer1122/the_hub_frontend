export type Game = {
    title: string, genre: string, image_link: string, utgivelsesdato: string
};

export async function createGame(game: Game) {
    const { title, genre, image_link, utgivelsesdato } = game;
    console.log("Received game data:", { title, genre, image_link, utgivelsesdato });
    const response = await fetch("/api/creategame", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, genre, image_link, utgivelsesdato }),
    });

    if (!response.ok) {
        throw new Error(`Failed to create game: ${response.statusText}`);
    }

    return new Response(await response.text(), { status: 201 });
}
