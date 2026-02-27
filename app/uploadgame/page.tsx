'use client'
import { useState } from 'react'
import { createGame } from '@/lib/create_game'

export default function Page() {
    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [imageLink, setImageLink] = useState('')
    const [releaseDate, setReleaseDate] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await createGame({
                title,
                genre,
                image_link: imageLink,
                utgivelsesdato: releaseDate,
            })
            alert('Game created successfully!')
        } catch (error) {
            console.error('Error creating game:', error)
            alert('Failed to create game.')
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create a New Game</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Genre</label>
                    <input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image Link</label>
                    <input
                        type="text"
                        value={imageLink}
                        onChange={(e) => setImageLink(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Release Date</label>
                    <input
                        type="date"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Create Game
                </button>
            </form>
        </div>
    )
}
