/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Card from "@/components/UI/Card";
import { Music } from 'lucide-react';

interface Artist {
    name: string;
    image: string;
    url: string;
}

const TopArtists: React.FC = () => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await fetch('/api/top-artists');
                const data = await response.json();

                if (response.ok) {
                    setArtists(data.artists);
                } else {
                    setError(data.error);
                }
            } catch {
                setError('Network error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <div className="aspect-square bg-zinc-800 rounded-lg"></div>
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

    if (!artists.length) {
        return (
            <Card className="text-center py-8">
                <Music className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                <p className="text-zinc-400 text-sm">No artists found</p>
            </Card>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mx-auto">
            {artists.map((artist, index) => (
                <a href={artist.url} key={index} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center" aria-label={`Listen to ${artist.name}`}>
                    <img className="w-full" src={artist.image} alt={`${artist.name}`} loading="lazy" />
                </a>
            ))}
        </div>
    );
};

export default TopArtists;