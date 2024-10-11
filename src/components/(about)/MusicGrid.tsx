/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import axios from "axios";

const MusicGrid: React.FC = () => {
    const [topAlbums, setTopAlbums] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const LASTFM_KEY = process.env.LASTFM_KEY;

    useEffect(() => {
        axios
            .get(`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=pranshu05&api_key=${LASTFM_KEY}&format=json&period=7day&limit=6`)
            .then((res) => {
                setTopAlbums(res.data.topalbums.album);
                setLoading(false);
            })
            .catch((err) => {
                setError("Error fetching top albums. Please try again.");
                setLoading(false);
            });
    }, [LASTFM_KEY]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!topAlbums.length) return <p>No top albums</p>;

    return (
        <div className="my-4">
            <p>Here are a few albums that filled my past week with colors!!</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mx-auto my-4">
                {topAlbums.map((album: any, index: number) => (
                    <a key={index} href={album.url} target="_blank" className="flex flex-col items-center">
                        <img className="rounded-md w-full" src={album.image[3]['#text']} alt={`${album.name}`} />
                    </a>
                ))}
            </div>
        </div >
    );
};

export default MusicGrid;