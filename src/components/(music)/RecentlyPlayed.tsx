/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import axios from "axios";
import { TimeAgo } from "@/lib/TimeAgo";
import { BsMusicNote } from "react-icons/bs";

const RecentlyPlayed: React.FC = () => {
    const [recentlyPlayed, setRecentlyPlayed] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const LASTFM_KEY = process.env.LASTFM_KEY;

    useEffect(() => {
        axios
            .get(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=pranshu05&api_key=${LASTFM_KEY}&format=json`)
            .then((res) => {
                setRecentlyPlayed(res.data.recenttracks.track);
                setLoading(false);
            })
            .catch((err) => {
                setError("Error fetching recently played tracks. Please try again.");
                setLoading(false);
            });
    }, [LASTFM_KEY]);

    if (loading) return <div className="text-lg font-bold text-zinc-400 my-4">Loading...</div>;
    if (error) return <div className="text-lg font-bold text-zinc-400 my-4">{error}</div>;
    if (!recentlyPlayed.length) return <div className="text-lg font-bold text-zinc-400 my-4">No recently played tracks</div>;

    const { date, artist, name, image, url } = recentlyPlayed[0];
    const isCurrentlyPlaying = !date;

    return (
        <div className="mb-4">
            <h1 className="text-2xl font-bold mb-2">{isCurrentlyPlaying ? 'Currently Playing' : 'Recently Played'}</h1>
            <a href={url} target="_blank" rel="noopener noreferrer" className="flex gap-2 w-fit">
                <div className="w-fit">
                    <img className="rounded-md grayscale" src={image[3]['#text']} alt={`${name} by ${artist['#text']}`} width={100} height={100} />
                </div>
                <div className="flex flex-col justify-center">
                    <p className="text-zinc-400">{isCurrentlyPlaying ? <div className="flex items-baseline"><BsMusicNote /> Currently Playing</div> : TimeAgo(new Date(date.uts * 1000))}</p>
                    <p className="text-lg font-bold">{name}</p>
                    <p className="text-sm">{artist['#text']}</p>
                </div>
            </a>
        </div>
    );
};

export default RecentlyPlayed;