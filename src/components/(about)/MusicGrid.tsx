/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";

const MusicGrid: React.FC = () => {
    const [topTracks, setTopTracks] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/api/tunestats/api/getUserTopTracks?userId=awgtjjqdxae0pw5as3bcadxcd&timeRange=week`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setTopTracks(data.topTracks.slice(0, 6));
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError("Error fetching top tracks. Please try again.");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!topTracks.length) return <p>No top tracks</p>;

    return (
        <div className="my-4">
            <p>Here are a few songs that filled my past week with colors!!</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mx-auto my-4">
                {topTracks.map((track: any, index: number) => (
                    <a key={index} href={`https://tunestats.vercel.app/track/${track.trackId}`} target="_blank" className="flex flex-col items-center">
                        <img className="rounded-md w-full" src={track.trackAlbumImage} alt={`${track.trackName}`} />
                    </a>
                ))}
            </div>
        </div >
    );
};

export default MusicGrid;