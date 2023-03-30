import { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import SpotifyAuthWrapper from '../APIs/spotifyAuth'

const spotifyApi = new SpotifyWebApi()

function Player() {
    const [token, setToken] = useState(null)
    const [track, setTrack] = useState(null)

    useEffect(() => {
        const getCurrentlyPlayingTrack = async () => {
            spotifyApi.setAccessToken(token)

            const response = await spotifyApi.getMyCurrentPlayingTrack()

            if (response?.item) {
                setTrack(response.item)
            }
        }

        const intervalId = setInterval(() => {
            getCurrentlyPlayingTrack()
        }, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [token])

    const handleToken = (token) => {
        setToken(token)
    }

    if (!token) {
        return <SpotifyAuthWrapper onToken={handleToken} />
    }

    if (!track) {
        return <div>No track currently playing</div>
    }

    return (
        <div>
            <img src={track.album.images[0].url} alt={track.album.name} />
            <div>{track.name}</div>
            <div>{track.artists.map((artist) => artist.name).join(', ')}</div>
        </div>
    )
}

export default Player
