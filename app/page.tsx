'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
    const [weeklyRecap, setWeeklyRecap] = useState<any>(null);
    const [loadingRecap, setLoadingRecap] = useState(false);

    useEffect(() => {
        fetchRecap();
    }, []);

    const fetchRecap = () => {
        setLoadingRecap(true);
        fetch('/api/weekly-recap')
            .then(res => res.json())
            .then(data => {
                setWeeklyRecap(data);
                setLoadingRecap(false);
            })
            .catch(err => {
                console.error('Error fetching recap:', err);
                setLoadingRecap(false);
            });
    };

    const currentDate = new Date();
    const weekNumber = Math.ceil((((currentDate.getTime() - new Date(currentDate.getFullYear(), 0, 1).getTime()) / 86400000) + new Date(currentDate.getFullYear(), 0, 1).getDay() + 1) / 7);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <main className="container mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">The Hub</h1>
                    <div className="flex gap-4">
                        <Link href="/calendar">
                            <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                                📅 Timeplan
                            </button>
                        </Link>
                        <Link href="/gamelibrary">
                            <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                                🎮 Spillbibliotek
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Weekly Recap - Main Focus */}
                <div className="mb-8">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-xl">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Uke {weekNumber} • {currentDate.toLocaleDateString('no-NO', { month: 'long', year: 'numeric' })}</p>
                                <h2 className="text-4xl font-bold">Ukeoversikt</h2>
                            </div>
                            <button
                                onClick={fetchRecap}
                                disabled={loadingRecap}
                                className="px-4 py-2 bg-purple-600 rounded-lg font-semibold hover:bg-purple-500 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {loadingRecap ? (
                                    <>
                                        <span className="animate-spin">⏳</span>
                                        Genererer...
                                    </>
                                ) : (
                                    <>
                                        🔄 Oppdater
                                    </>
                                )}
                            </button>
                        </div>
                        
                        {loadingRecap && !weeklyRecap ? (
                            <div className="flex items-center justify-center py-16">
                                <div className="text-center">
                                    <div className="text-4xl mb-4 animate-bounce">🤖</div>
                                    <p className="text-gray-400">AI genererer ukeoversikten din...</p>
                                </div>
                            </div>
                        ) : weeklyRecap?.recap ? (
                            <div className="prose prose-invert max-w-none">
                                <p className="text-lg text-gray-200 whitespace-pre-wrap leading-relaxed">{weeklyRecap.recap}</p>
                            </div>
                        ) : weeklyRecap?.error ? (
                            <div className="text-red-400 py-8">
                                <p>⚠️ Kunne ikke generere ukeoversikt: {weeklyRecap.error}</p>
                            </div>
                        ) : (
                            <div className="text-gray-400 py-8 text-center">
                                <p>Klikk "Oppdater" for å generere ukeoversikten</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/calendar" className="block">
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all hover:scale-102">
                            <div className="text-3xl mb-3">📅</div>
                            <h3 className="text-xl font-bold mb-2">Timeplan</h3>
                            <p className="text-gray-400 text-sm">Se ukeplan og årsplan</p>
                        </div>
                    </Link>
                    <Link href="/gamelibrary" className="block">
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all hover:scale-102">
                            <div className="text-3xl mb-3">🎮</div>
                            <h3 className="text-xl font-bold mb-2">Spillbibliotek</h3>
                            <p className="text-gray-400 text-sm">Utforsk spillsamlingen</p>
                        </div>
                    </Link>
                    <Link href="/uploadgame" className="block">
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all hover:scale-102">
                            <div className="text-3xl mb-3">➕</div>
                            <h3 className="text-xl font-bold mb-2">Legg til spill</h3>
                            <p className="text-gray-400 text-sm">Utvid samlingen din</p>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    );
}

