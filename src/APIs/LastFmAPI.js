import querystring from 'querystring'

const LASTFM_API_KEY = process.env.REACT_APP_LAST_FM_API_KEY
const LASTFM_API_ENDPOINT = 'http://ws.audioscrobbler.com/2.0/'

export default async function getNowPlayingItem() {
    const params = querystring.stringify({
        method: 'user.getRecentTracks',
        user: 'pranshu05',
        api_key: LASTFM_API_KEY,
        format: 'json',
        limit: 1,
    })

    const response = await fetch(`${LASTFM_API_ENDPOINT}?${params}`)
    const data = await response.json()

    if (data.recenttracks.track.length === 0) {
        return false
    }

    const track = data.recenttracks.track[0]
    const artist = track.artist['#text']
    const isPlaying = track['@attr'] && track['@attr'].nowplaying === 'true'
    const songUrl = track.url
    const title = track.name
    const albumName = track.album['#text']
    const albumImageUrl = track.image[3]['#text']

    return {
        artist,
        isPlaying,
        songUrl,
        title,
        albumName,
        albumImageUrl,
    }
}
