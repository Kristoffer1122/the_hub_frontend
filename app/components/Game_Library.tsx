"use client";
import GetGames from "@/lib/get_games";
import Link from "next/link";

export default function GameLibrary() {

    const games = GetGames();

    if (games.length === 0) {
        return <p className="pt-10 text-center text-gray-500">Loading games...</p>;
    }

    return (
        <div className="card">
            <div className="min-h-screen bg-gray-900 px-6 py-10">
                <h1 className="text-4xl font-bold text-white mb-8 text-center tracking-wide">
                    🎮 Game Library
                </h1>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {games.map((game) => (
                        <li
                            key={game.id}
                            className="relative group h-72 rounded-2xl overflow-hidden shadow-lg
                                   cursor-pointer transition-transform duration-300
                                   hover:scale-105 hover:shadow-2xl"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform
                                       duration-500 group-hover:scale-110"
                                style={{ backgroundImage: `url(${game.image_link})` }}
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/80
                                        via-black/30 to-transparent" />

                            {/* Game Title */}
                            <div className="absolute bottom-0 w-full p-4">
                                <h2 className="text-xl font-semibold text-white drop-shadow-lg">
                                    {game.title}
                                </h2>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="mt-10 text-center">
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg
                                       hover:bg-indigo-500 transition-colors duration-300">
                        <Link href="/uploadgame">
                            Upload New Game
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}



