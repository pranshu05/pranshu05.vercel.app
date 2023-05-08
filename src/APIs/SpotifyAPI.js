import querystring from 'querystring'

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN

const getAccessToken = async () => {
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

   return response.json()
}

export const getNowPlaying = async (
   client_id,
   client_secret,
   refresh_token
) => {
   const { access_token } = await getAccessToken(
      client_id,
      client_secret,
      refresh_token
   )

   return fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
         Authorization: `Bearer ${access_token}`,
      },
   })
}

export default async function getNowPlayingItem(
   client_id,
   client_secret,
   refresh_token
) {
   const response = await getNowPlaying(client_id, client_secret, refresh_token)
   if (response.status === 204 || response.status > 400) {
      return false
   }

   const song = await response.json()
   const artist = song.item.artists.map((_artist) => _artist.name).join(', ')
   const isPlaying = song.is_playing
   const songUrl = song.item.external_urls.spotify
   const title = song.item.name
   const albumImageUrl = song.item.album.images[0].url
   const albumName = song.item.album.name
   const progressMs = song.progress_ms
   const durationMs = song.item.duration_ms

   return {
      artist,
      isPlaying,
      songUrl,
      title,
      albumImageUrl,
      progressMs,
      durationMs,
      albumName,
   }
}
