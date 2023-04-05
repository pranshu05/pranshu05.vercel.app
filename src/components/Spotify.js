import { useEffect, useState } from 'react'
import getNowPlayingItem from '../APIs/SpotifyAPI'

export function SpotifyPlayer(props) {
    const [result, setResult] = useState({})

    useEffect(() => {
        Promise.all([
            getNowPlayingItem(
                props.client_id,
                props.client_secret,
                props.refresh_token
            ),
        ]).then((results) => {
            setResult(results[0])
        })
    })

    return result.isPlaying ? (
        <div className="nowplaying">
            <div className="spotify-cont">
                <div className="spotify-track">
                    <a href={result.songUrl} target="_blank" rel="noreferrer">
                        <div className="song-img">
                            <img
                                src={result.albumImageUrl}
                                alt={`Album cover for ${result.title}`}
                            />
                        </div>
                        <span className="song-info">
                            <span className="song-title">{result.title}</span>
                            <span className="song-artist">{result.artist}</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    ) : (
        <div className="nowplaying">
            <div className="spotify-cont">
                <div className="spotify-track">
                    <a href="https://open.spotify.com/user/awgtjjqdxae0pw5as3bcadxcd">
                        Not listening to Spotify rn!
                    </a>
                </div>
            </div>
        </div>
    )
}
