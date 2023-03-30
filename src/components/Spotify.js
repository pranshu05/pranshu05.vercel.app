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
            <p>
                <FaSpotify fontSize="xx-large" /> listening to {result.title} by{' '}
                {result.artist}
            </p>
        </div>
    ) : (
        <div className="nowplaying">
            <p>
                <FaSpotify fontSize="xx-large" /> Not listening to Spotify rn!
            </p>
        </div>
    )
}

export default SpotifyPlayer
