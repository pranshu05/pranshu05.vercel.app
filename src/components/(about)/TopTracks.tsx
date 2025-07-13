/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Card from "@/components/UI/Card";
import { Music } from 'lucide-react';

interface Album {
    name: string;
    artist: string;
    image: string;
    playcount: number;
    url: string;
}

const TopTracks: React.FC = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await fetch('/api/top-tracks');
                const data = await response.json();

                if (response.ok) {
                    setAlbums(data.albums);
                } else {
                    setError(data.error || 'Failed to fetch tracks');
                }
            } catch {
                setError('Network error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchTracks();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <div className="aspect-square bg-zinc-800 rounded-lg mb-2"></div>
                        <div className="h-3 bg-zinc-800 rounded mb-1"></div>
                        <div className="h-2 bg-zinc-800 rounded w-3/4"></div>
                    </Card>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <Card className="text-center py-8">
                <Music className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                <p className="text-zinc-400 text-sm">{error}</p>
            </Card>
        );
    }

    if (!albums.length) {
        return (
            <Card className="text-center py-8">
                <Music className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                <p className="text-zinc-400 text-sm">No tracks found</p>
            </Card>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mx-auto">
            {albums.map((track, index) => (
                <a href={track.url} key={index} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center" aria-label={`Listen to ${track.name} by ${track.artist}`}>
                    <img className="w-full" src={track.image} alt={`${track.name}`} loading="lazy" />
                </a>
            ))}
        </div>
    );
};

export default TopTracks;