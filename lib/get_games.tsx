import { useState, useEffect } from "react";

interface Game {
    id: number;
    title: string;
    image_link: string;
    utgivelsesdato: string;
}

export default function GetGames() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch("/api/getgames")
            .then((response) => response.json())
            .then((data) => setGames(data));
    }, []);

    return (
        games as Game[]
    );
}
