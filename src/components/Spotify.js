import { useEffect, useState } from 'react'
import getNowPlayingItem from '../APIs/SpotifyAPI'
import { FaSpotify } from 'react-icons/fa'

function SpotifyPlayer(props) {
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
            <h2>My music room 🎧</h2>
            <div className="spotify-cont">
                <div className="spotify-logo">
                    <FaSpotify fontSize="xx-large" color="#dbb3fe" />{' '}
                </div>
                <div className="spotify-track">
                    <a href="https://open.spotify.com/user/awgtjjqdxae0pw5as3bcadxcd">
                        listening to {result.title} by {result.artist}
                    </a>
                </div>
            </div>
        </div>
    ) : (
        <div className="nowplaying">
            <h2>My music room 🎧</h2>
            <div className="spotify-cont">
                <div className="spotify-logo">
                    <FaSpotify fontSize="xx-large" color="#dbb3fe" />{' '}
                </div>
                <div className="spotify-track">
                    <a href="https://open.spotify.com/user/awgtjjqdxae0pw5as3bcadxcd">
                        Not listening to Spotify rn!
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SpotifyPlayer
