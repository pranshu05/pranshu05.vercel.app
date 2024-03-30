import { useState, useEffect } from "react";
import axios from "axios";

const TopArtists: React.FC = () => {
    const [topArtists, setTopArtists] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const LASTFM_KEY = process.env.LASTFM_KEY;

    useEffect(() => {
        axios
            .get(`https://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=pranshu05&api_key=${LASTFM_KEY}&format=json`)
            .then((res) => {
                setTopArtists(res.data.weeklyartistchart.artist);
                setLoading(false);
            })
            .catch((err) => {
                setError("Error fetching top artists. Please try again.");
                setLoading(false);
            });
    }, [LASTFM_KEY]);

    if (loading) return <div className="text-lg font-bold text-zinc-400 my-4">Loading...</div>;
    if (error) return <div className="text-lg font-bold text-zinc-400 my-4">{error}</div>;
    if (!topArtists.length) return <div className="text-lg font-bold text-zinc-400 my-4">No top artists</div>;

    return (
        <div className="my-4">
            <div className="flex items-baseline">
                <h1 className="text-2xl font-bold mb-2">Top Artists</h1>
                <p className="text-sm mx-2">Weekly stats.</p>
            </div>
            <div className="grid grid-flow-col gap-2 overflow-x-auto my-2">
                {topArtists.map((artist: any, index: number) => (
                    <a key={index} href={artist.url} target="_blank" className="relative w-[100px] h-[100px] overflow-hidden group">
                        {/* <img className="rounded-md grayscale" src={artist.image[0]['#text']} alt={`${artist.name}`} width={100} height={100} /> */}
                        <div className="absolute top-0 left-0 right-0 p-2 overflow-y-auto rounded-md w-full h-full max-h-full scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 bg-black bg-opacity-40 backdrop backdrop-blur-sm">
                            <p className="text-md font-bold">{artist.name}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default TopArtists;