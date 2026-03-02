export const updateGame = async (id: number, title: string): Promise<string> => {
    const response = await fetch(`/api/games/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
    });

    if (!response.ok) {
        throw new Error(`Failed to update game: ${response.statusText}`);
    }

    return await response.text();
};
