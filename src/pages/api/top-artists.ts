import { NextApiRequest, NextApiResponse } from 'next';

interface LastFmArtist {
    name: string;
    mbid: string;
    image: Array<{ '#text': string; size: string }>;
    url: string;
}

interface LastFmResponse {
    topartists: { artist: LastFmArtist[] };
}

interface SimplifiedArtist {
    name: string;
    image: string | null;
    url: string;
}

async function getSpotifyToken(): Promise<string | null> {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        return null;
    }

    const authBuffer = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${authBuffer}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials',
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data.access_token;
    } catch {
        return null;
    }
}

async function searchSpotifyArtist(artistName: string, token: string): Promise<string | null> {
    const query = encodeURIComponent(artistName);
    const url = `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=1`;

    try {
        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            return null;
        }

        const data = await res.json();
        const artist = data.artists?.items?.[0];

        if (!artist) {
            return null;
        }

        const image = artist.images?.[0]?.url || null;

        if (!image) {
            return null;
        }

        return image;
    } catch {
        return null;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { period = '7day', limit = '6', username = 'pranshu05' } = req.query;
    const apiKey = process.env.LASTFM_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Last.fm API key not configured' });
    }

    try {
        const lastFmUrl = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${apiKey}&period=${period}&limit=${limit}&format=json`;

        const response = await fetch(lastFmUrl);
        if (!response.ok) {
            throw new Error(`Last.fm API error: ${response.status}`);
        }

        const data: LastFmResponse = await response.json();
        if (!data.topartists || !data.topartists.artist) {
            throw new Error('Invalid Last.fm response');
        }

        const token = await getSpotifyToken();

        if (!token) {
            return res.status(500).json({ error: 'Failed to authenticate with Spotify' });
        }

        const artists: SimplifiedArtist[] = [];

        for (const artist of data.topartists.artist) {
            try {
                const spotifyImage = await searchSpotifyArtist(artist.name, token);

                if (spotifyImage) {
                    artists.push({
                        name: artist.name,
                        image: spotifyImage,
                        url: artist.url,
                    });
                } else {
                    artists.push({
                        name: artist.name,
                        image: null,
                        url: artist.url,
                    });
                }

                await new Promise(resolve => setTimeout(resolve, 100));

            } catch {
                artists.push({
                    name: artist.name,
                    image: null,
                    url: artist.url,
                });
            }
        }

        res.status(200).json({ artists });
    } catch {
        res.status(500).json({ error: 'Failed to fetch top artists', artists: [] });
    }
}