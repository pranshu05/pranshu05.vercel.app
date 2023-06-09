import React, { useState, useEffect } from 'react'
import axios from 'axios'
import querystring from 'querystring'
import { SpotifyPlayer } from './Spotify'

export const Music = () => {
   const [topTracks, setTopTracks] = useState([])
   const [topArtists, setTopArtists] = useState([])
   const [recentlyPlayed, setRecentlyPlayed] = useState([])
   const [accessToken, setAccessToken] = useState('')
   const LAST_FM_API_KEY = process.env.REACT_APP_LAST_FM_API_KEY
   const username = 'pranshu05'

   useEffect(() => {
      const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
      const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID
      const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
      const refresh_token = process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN

      const fetchData = async () => {
         const basic = btoa(`${client_id}:${client_secret}`)

         const response = await fetch(TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
               Authorization: `Basic ${basic}`,
               'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: querystring.stringify({
               grant_type: 'refresh_token',
               refresh_token,
            }),
         })

         const data = await response.json()
         if (data.access_token) {
            setAccessToken(data.access_token)
         }
      }

      const fetchTopTracks = async () => {
         const response = await axios.get(
            `http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=${LAST_FM_API_KEY}&format=json&limit=10&period=4week`
         )
         setTopTracks(response.data.toptracks.track)
      }

      const fetchTopArtists = async () => {
         const response = await axios.get(
            `http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${LAST_FM_API_KEY}&format=json&limit=10&period=4week`
         )
         setTopArtists(response.data.topartists.artist)
      }

      const fetchRecentlyPlayed = async () => {
         const response = await axios.get(
            `https://api.spotify.com/v1/me/player/recently-played?limit=10`,
            {
               headers: {
                  Authorization: `Bearer ${accessToken}`,
               },
            }
         )
         setRecentlyPlayed(response.data.items)
      }

      if (!accessToken) {
         fetchData()
      } else {
         fetchTopTracks()
         fetchTopArtists()
         fetchRecentlyPlayed()
      }
   })

   if (
      recentlyPlayed.length === 0 ||
      topArtists.length === 0 ||
      topTracks.length === 0
   ) {
      return (
         <div className="music">
            <h1>Spotify Stats</h1>
            <small style={{ color: '#818181' }}>
               My Spotify stats, updated in real-time.
            </small>
            <SpotifyPlayer />
            <div style={{ width: '100%', height: '100px' }}>
               <div className="gradient" />
            </div>
            <div style={{ width: '100%', height: '100px' }}>
               <div className="gradient" />
            </div>
            <div style={{ width: '100%', height: '100px' }}>
               <div className="gradient" />
            </div>
         </div>
      )
   }

   const getTimeAgo = (timestamp) => {
      const secondsAgo = Math.floor((new Date() - new Date(timestamp)) / 1000)
      if (secondsAgo < 60) {
         return `${secondsAgo} s ago`
      } else if (secondsAgo < 3600) {
         const minutesAgo = Math.floor(secondsAgo / 60)
         return `${minutesAgo} m ago`
      } else if (secondsAgo < 86400) {
         const hoursAgo = Math.floor(secondsAgo / 3600)
         return `${hoursAgo} h ago`
      } else {
         const daysAgo = Math.floor(secondsAgo / 86400)
         return `${daysAgo} d ago`
      }
   }

   return (
      <div className="music">
         <h1>Spotify Stats</h1>
         <small style={{ color: '#818181' }}>
            My Spotify stats, updated in real-time.
         </small>
         <SpotifyPlayer />
         <div className="recently-played-cont">
            <h2>Recently Played</h2>
            {recentlyPlayed.map((track) => (
               <a
                  key={track.played_at}
                  href={track.track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="track link"
               >
                  <div className="recently-played-div">
                     <div className="recently-played-text">
                        {track.track.name}
                        <br />
                        <small>{track.track.artists[0].name}</small>
                     </div>
                     <div className="recently-played-time">
                        <small>{getTimeAgo(track.played_at)}</small>
                     </div>
                  </div>
               </a>
            ))}
         </div>
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
                  aria-label="track url"
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
                  aria-label="artist url"
               >
                  <div className="top-artists-div">
                     <div className="top-artists-text">{artist.name}</div>
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
