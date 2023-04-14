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
                        <div className="song-info">
                            <div className="song-title">{result.title}</div>
                            <div className="song-artist">{result.artist}</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    ) : (
        <div className="nowplaying">
            <div className="spotify-cont">
                <div className="spotify-track">
                    <a href="https://open.spotify.com/user/awgtjjqdxae0pw5as3bcadxcd">
                        <div className="song-img">
                            <img
                                src="https://user-images.githubusercontent.com/70943732/232037055-e85d5b44-64a4-4192-838e-712faf93989e.png"
                                alt="music"
                            />
                        </div>
                        <div className="song-info">
                            <div className="song-title">
                                Listening nothing rn!
                            </div>
                            <div className="song-artist">Spotify</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}
