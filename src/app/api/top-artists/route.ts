import { NextResponse } from 'next/server'

interface LastFmArtist {
    name: string
    mbid: string
    image: Array<{ '#text': string; size: string }>
    url: string
}

interface LastFmResponse {
    topartists: { artist: LastFmArtist[] }
}

interface SimplifiedArtist {
    name: string
    image: string | null
    url: string
}

interface ArtistWithColors extends SimplifiedArtist {
    colors?: string[]
}

async function getSpotifyToken(): Promise<string | null> {
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

    if (!clientId || !clientSecret) {
        return null
    }

    const authBuffer = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${authBuffer}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials',
        })

        if (!response.ok) {
            return null
        }

        const data = await response.json()
        return data.access_token
    } catch {
        return null
    }
}

async function searchSpotifyArtist(artistName: string, token: string): Promise<string | null> {
    const query = encodeURIComponent(artistName)
    const url = `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=1`

    try {
        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!res.ok) {
            return null
        }

        const data = await res.json()
        const artist = data.artists?.items?.[0]

        if (!artist) {
            return null
        }

        const image = artist.images?.[0]?.url || null

        if (!image) {
            return null
        }

        return image
    } catch {
        return null
    }
}

async function extractDominantColor(imageUrl: string): Promise<string[]> {
    try {
        const colorPaletteUrl = `https://api.color.pizza/v1/?values=${encodeURIComponent(imageUrl)}`
        
        try {
            const colorResponse = await fetch(colorPaletteUrl)
            if (colorResponse.ok) {
                const colorData = await colorResponse.json()
                if (colorData.colors && Array.isArray(colorData.colors)) {
                    return colorData.colors.slice(0, 6)
                }
            }
        } catch {
            // Fallback
        }

        return generatePaletteFromUrl(imageUrl, 6)
    } catch (error) {
        console.error('Error extracting colors:', error)
        return []
    }
}

function generatePaletteFromUrl(url: string, count: number): string[] {
    let hash = 0
    for (let i = 0; i < url.length; i++) {
        const char = url.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash
    }

    const colors: string[] = []
    for (let i = 0; i < count; i++) {
        const hue = ((hash + i * 360 / count) % 360)
        const saturation = 70 + (i % 3) * 10
        const lightness = 50 + (i % 2) * 10
        
        const hex = hslToHex(hue, saturation, lightness)
        colors.push(hex)
    }

    return colors
}

function hslToHex(h: number, s: number, l: number): string {
    l /= 100
    const a = s * Math.min(l, 1 - l) / 100
    const f = (n: number) => {
        const k = (n + h / 30) % 12
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
        return Math.round(255 * color).toString(16).padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '7day'
    const limit = searchParams.get('limit') || '6'
    const username = searchParams.get('username') || 'pranshu05'
    const includeColors = searchParams.get('includeColors') === 'true'

    const apiKey = process.env.LASTFM_KEY

    if (!apiKey) {
        return NextResponse.json({ error: 'Last.fm API key not configured' }, { status: 500 })
    }

    try {
        const lastFmUrl = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${apiKey}&period=${period}&limit=${limit}&format=json`

        const response = await fetch(lastFmUrl)
        if (!response.ok) {
            throw new Error(`Last.fm API error: ${response.status}`)
        }

        const data: LastFmResponse = await response.json()
        if (!data.topartists || !data.topartists.artist) {
            throw new Error('Invalid Last.fm response')
        }

        const token = await getSpotifyToken()

        if (!token) {
            return NextResponse.json({ error: 'Failed to authenticate with Spotify' }, { status: 500 })
        }

        const artists: ArtistWithColors[] = []

        for (const artist of data.topartists.artist) {
            try {
                const spotifyImage = await searchSpotifyArtist(artist.name, token)

                const artistData: ArtistWithColors = {
                    name: artist.name,
                    image: spotifyImage,
                    url: artist.url,
                }

                if (includeColors && spotifyImage) {
                    const colors = await extractDominantColor(spotifyImage)
                    if (colors.length > 0) {
                        artistData.colors = colors
                    }
                }

                artists.push(artistData)
                await new Promise(resolve => setTimeout(resolve, 100))

            } catch {
                artists.push({
                    name: artist.name,
                    image: null,
                    url: artist.url,
                })
            }
        }

        return NextResponse.json({ artists })
    } catch {
        return NextResponse.json({ error: 'Failed to fetch top artists', artists: [] }, { status: 500 })
    }
}