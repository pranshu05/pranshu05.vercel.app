import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const Music = () => {
    const [topTracks, setTopTracks] = useState([])
    const [topArtists, setTopArtists] = useState([])
    const API_KEY = '4e92a8637503023ef75aaec0105733fc'
    const username = 'pranshu05'

    useEffect(() => {
        const fetchTopTracks = async () => {
            const response = await axios.get(
                `http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=${API_KEY}&format=json&limit=10&period=4week`
            )
            setTopTracks(response.data.toptracks.track)
        }

        const fetchTopArtists = async () => {
            const response = await axios.get(
                `http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${API_KEY}&format=json&limit=10&period=4week`
            )
            setTopArtists(response.data.topartists.artist)
        }

        fetchTopTracks()
        fetchTopArtists()
    }, [])

    return (
        <div className="music">
            <h1>Spotify Stats</h1>
            <small style={{ color: '#818181' }}>
                My Spotify stats, updated every 24 hours.
            </small>
            <div className="top-tracks-cont">
                <h2>Top Tracks</h2>
                <small style={{ color: '#818181' }}>
                    According to last 4 weeks.
                </small>
                {topTracks.map((track) => (
                    <a
                        key={track.name}
                        href={track.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="top-tracks-div">
                            <div className="top-tracks-text">
                                {track.name}
                                <br /> <small>{track.artist.name}</small>
                            </div>
                            <div className="top-tracks-plays">
                                <small>{track.playcount} plays</small>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            <div className="top-artists-cont">
                <h2>Top Artists</h2>
                <small style={{ color: '#818181' }}>
                    According to last 4 weeks.
                </small>
                {topArtists.map((artist) => (
                    <a
                        key={artist.name}
                        href={artist.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="top-artists-div">
                            <div className="top-artists-text">
                                {artist.name}
                            </div>
                            <div className="top-artists-plays">
                                <small>{artist.playcount} plays</small>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}
