/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react"

const MusicGrid: React.FC = () => {
    const [topTracks, setTopTracks] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch(`/api/tunestats/api/getUserTopTracks?userId=awgtjjqdxae0pw5as3bcadxcd&timeRange=week`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setTopTracks(data.topTracks.slice(0, 6))
                setLoading(false)
            })
            .catch((error) => {
                console.error(error)
                setError("Error fetching top tracks. Please try again.")
                setLoading(false)
            })
    }, [])

    if (loading) return <p className="text-sm text-ainc-300">Loading...</p>
    if (error) return <p className="text-sm text-ainc-300">{error}</p>
    if (!topTracks.length) return <p className="text-sm text-ainc-300">No top tracks</p>

    return (
        <div>
            <p className="text-zinc-300 text-sm leading-relaxed mb-6">I love listening to music while coding. Here are a few songs that filled my past week with colors!!</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mx-auto">
                {topTracks.map((track: any, index: number) => (
                    <a aria-label='Links do not have a discernible name' key={index} href={`https://tunestats.vercel.app/track/${track.trackId}`} target="_blank" className="flex flex-col items-center" rel="noreferrer">
                        <img className="w-full" src={track.trackAlbumImage || "/placeholder.svg"} alt={`${track.trackName}`} />
                    </a>
                ))}
            </div>
        </div>
    )
}

export default MusicGrid