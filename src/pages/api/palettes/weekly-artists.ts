import { NextApiRequest, NextApiResponse } from 'next';
import { getWeekStartByWeekNumber, getWeekEndByWeekNumber } from '@/lib/PaletteDB';

interface LastFmWeeklyArtist {
    name: string;
    mbid: string;
    url: string;
    playcount: string;
}

interface LastFmWeeklyChartResponse {
    weeklyartistchart: {
        artist: LastFmWeeklyArtist[];
        '@attr': {
            from: string;
            to: string;
        };
    };
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

    const { week, year, limit = '6', username = 'pranshu05' } = req.query;
    const apiKey = process.env.LASTFM_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Last.fm API key not configured' });
    }

    if (!week || !year) {
        return res.status(400).json({
            error: 'Missing required parameters',
            message: 'Both week and year are required'
        });
    }

    const weekNum = parseInt(week as string);
    const yearNum = parseInt(year as string);
    const limitNum = parseInt(limit as string);

    if (isNaN(weekNum) || isNaN(yearNum) || weekNum < 1 || weekNum > 53) {
        return res.status(400).json({
            error: 'Invalid parameters',
            message: 'Week must be between 1 and 53, year must be a valid number'
        });
    }

    try {
        const weekStart = getWeekStartByWeekNumber(weekNum, yearNum);
        const weekEnd = getWeekEndByWeekNumber(weekNum, yearNum);

        const fromTimestamp = Math.floor(weekStart.getTime() / 1000);
        const toTimestamp = Math.floor(weekEnd.getTime() / 1000);

        const lastFmUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=${username}&api_key=${apiKey}&from=${fromTimestamp}&to=${toTimestamp}&format=json`;

        const response = await fetch(lastFmUrl);
        if (!response.ok) {
            throw new Error(`Last.fm API error: ${response.status}`);
        }

        const data: LastFmWeeklyChartResponse = await response.json();

        if (!data.weeklyartistchart || !data.weeklyartistchart.artist) {
            return res.status(404).json({
                error: 'No data found',
                message: `No listening data available for week ${weekNum} of ${yearNum}`,
                artists: []
            });
        }

        const token = await getSpotifyToken();

        if (!token) {
            return res.status(500).json({ error: 'Failed to authenticate with Spotify' });
        }

        const artists: SimplifiedArtist[] = [];
        const weeklyArtists = data.weeklyartistchart.artist.slice(0, limitNum);

        for (const artist of weeklyArtists) {
            try {
                const spotifyImage = await searchSpotifyArtist(artist.name, token);

                artists.push({
                    name: artist.name,
                    image: spotifyImage,
                    url: artist.url,
                });

                await new Promise(resolve => setTimeout(resolve, 100));

            } catch (error) {
                console.error(`Error fetching Spotify data for ${artist.name}:`, error);
                artists.push({
                    name: artist.name,
                    image: null,
                    url: artist.url,
                });
            }
        }

        res.status(200).json({
            artists,
            week: weekNum,
            year: yearNum,
            period: {
                from: fromTimestamp,
                to: toTimestamp,
                fromDate: weekStart.toISOString(),
                toDate: weekEnd.toISOString()
            }
        });
    } catch (error) {
        console.error('Error fetching weekly artists:', error);
        res.status(500).json({
            error: 'Failed to fetch weekly artists',
            message: error instanceof Error ? error.message : 'Unknown error',
            artists: []
        });
    }
}