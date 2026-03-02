'use client'

import { useState, useEffect } from 'react';

export default function Calendar() {
    const [view, setView] = useState<'week' | 'year'>('week');
    const [yearData, setYearData] = useState<any[][]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (view === 'year' && yearData.length === 0) {
            setLoading(true);
            fetch('/api/yearplan')
                .then(res => res.json())
                .then(result => {
                    setYearData(result.data || []);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error loading yearplan:', err);
                    setLoading(false);
                });
        }
    }, [view, yearData.length]);
    const schedule = {
        week: 10,
        month: "MARS 2026",
        days: [
            {
                name: "Mandag",
                date: 2,
                appointments: [
                    { time: "08:15 - 09:45", room: "Grønn base IM", subject: "Driftsstøtte", teacher: "Madeleine Aurora Lorås Hollund" },
                    { time: "10:00 - 11:30", room: "Grønn base IM", subject: "Driftsstøtte", teacher: "Madeleine Aurora Lorås Hollund" },
                    { time: "12:15 - 13:45", room: "Grønn base IM", subject: "Yrkesfaglig fordypning vg2", teacher: "Sondre Stai" },
                    { time: "14:00 - 15:30", room: "Grønn base IM", subject: "Yrkesfaglig fordypning vg2", teacher: "Sondre Stai" }
                ]
            },
            {
                name: "Tirsdag",
                date: 3,
                appointments: [
                    { time: "09:00 - 09:45", room: "Blå base IM", subject: "2IMMP/SAK1001", teacher: "Ingeborg Urke Myklebust" },
                    { time: "10:00 - 11:30", room: "Grønn base IM", subject: "Yrkesfaglig fordypning vg2", teacher: "Madeleine Aurora Lorås Hollund" },
                    { time: "12:15 - 13:45", room: "Grønn base IM", subject: "Driftsstøtte", teacher: "Kristoffer Ryeng" },
                    { time: "14:00 - 15:30", room: "", subject: "Brukerstøtte", teacher: "Kristoffer Ryeng" }
                ]
            },
            {
                name: "Onsdag",
                date: 4,
                appointments: [
                    { time: "08:15 - 09:45", room: "", subject: "Brukerstøtte", teacher: "Kristoffer Ryeng" },
                    { time: "10:00 - 10:45", room: "", subject: "Brukerstøtte", teacher: "Kristoffer Ryeng" },
                    { time: "10:45 - 11:30", room: "Grønn base IM", subject: "Utvikling", teacher: "Kristoffer Ryeng" },
                    { time: "12:15 - 13:00", room: "", subject: "Basismøte 2IMIT", teacher: "Madeleine Aurora Lorås Hollund" },
                    { time: "13:00 - 13:45", room: "Grønn base IM", subject: "Utvikling", teacher: "Madeleine Aurora Lorås Hollund" },
                    { time: "14:00 - 15:30", room: "VAHL2", subject: "2IMIT/2IMMP/KRO1018", teacher: "Trine Sørumshaugen" }
                ]
            },
            {
                name: "Torsdag",
                date: 5,
                appointments: [
                    { time: "08:15 - 09:45", room: "Grønn base IM", subject: "Yrkesfaglig fordypning vg2", teacher: "Madeleine Aurora Lorås Hollund" },
                    { time: "10:00 - 10:45", room: "Grønn base IM", subject: "Yrkesfaglig fordypning vg2", teacher: "Madeleine Aurora Lorås Hollund" },
                    { time: "10:45 - 11:30", room: "Blå base IM", subject: "2IMMP/SAK1001", teacher: "Ingeborg Urke Myklebust" },
                    { time: "12:15 - 13:45", room: "Blå base IM", subject: "2IMMP/2IMIT/NOR1262", teacher: "Ingeborg Urke Myklebust" }
                ]
            },
            {
                name: "Fredag",
                date: 6,
                appointments: [
                    { time: "09:00 - 09:45", room: "Blå base IM", subject: "2IMMP/SAK1001", teacher: "Ingeborg Urke Myklebust" },
                    { time: "10:00 - 11:30", room: "Blå base IM", subject: "2IMMP/2IMIT/NOR1262", teacher: "Ingeborg Urke Myklebust" },
                    { time: "12:15 - 13:45", room: "Grønn base IM", subject: "Utvikling", teacher: "Mathias Haslund-Rastad" },
                    { time: "14:00 - 15:30", room: "Grønn base IM", subject: "Utvikling", teacher: "Mathias Haslund-Rastad" }
                ]
            }
        ]
    };

    const headers = yearData[0] || [];
    const rows = yearData.slice(1);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">
                            {view === 'week' ? '📅 Timeplan' : '📚 Årsplan'}
                        </h1>
                        {view === 'week' && (
                            <p className="text-xl text-gray-400">UKE {schedule.week}, {schedule.month}</p>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setView('week')}
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${view === 'week'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                        >
                            Ukeplan
                        </button>
                        <button
                            onClick={() => setView('year')}
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${view === 'year'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                        >
                            Årsplan
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center text-2xl">Loading...</div>
                ) : view === 'week' ? (
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {schedule.days.map((day) => (
                            <div key={day.date} className="bg-gray-800 rounded-lg p-4">
                                <div className="mb-4 border-b border-gray-700 pb-2">
                                    <h2 className="text-xl font-bold">{day.name}</h2>
                                    <p className="text-gray-400">{day.date}. mars</p>
                                    <p className="text-sm text-purple-400">{day.appointments.length} avtaler</p>
                                </div>

                                <div className="space-y-3">
                                    {day.appointments.map((apt, index) => (
                                        <div key={index} className="bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition-colors">
                                            <div className="text-xs font-bold mb-1">⏰ {apt.time}</div>
                                            {apt.room && <div className="text-xs mb-1">📍 {apt.room}</div>}
                                            <div className="font-semibold text-sm mb-1">{apt.subject}</div>
                                            <div className="text-xs text-gray-300">{apt.teacher}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-gray-800">
                                    {headers.map((header: any, i: number) => (
                                        <th key={i} className="border border-gray-700 p-2 text-left font-semibold sticky top-0 bg-gray-800">
                                            {header || ''}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row: any[], rowIndex: number) => (
                                    <tr key={rowIndex} className="hover:bg-gray-800 transition-colors">
                                        {headers.map((_: any, colIndex: number) => (
                                            <td key={colIndex} className="border border-gray-700 p-2 whitespace-pre-wrap">
                                                {row[colIndex] !== null && row[colIndex] !== undefined ? String(row[colIndex]) : ''}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
