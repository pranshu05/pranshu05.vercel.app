import { NextApiRequest, NextApiResponse } from 'next';

interface LastFmAlbum {
    name: string;
    artist: { name: string; };
    image: Array<{ '#text': string; size: string; }>;
    playcount: string;
    url: string;
}

interface LastFmResponse {
    topalbums: { album: LastFmAlbum[]; };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { period = '7day', limit = '6' } = req.query;
    const username = 'pranshu05';
    const apiKey = process.env.LASTFM_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Last.fm API key not configured' });
    }

    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&api_key=${apiKey}&period=${period}&limit=${limit}&format=json`);

        if (!response.ok) {
            throw new Error(`Last.fm API error: ${response.status}`);
        }

        const data: LastFmResponse = await response.json();

        const albums = data.topalbums.album.map(album => ({
            name: album.name,
            artist: album.artist.name,
            image: album.image.find(img => img.size === 'extralarge')?.['#text'] || album.image.find(img => img.size === 'medium')?.['#text'],
            playcount: parseInt(album.playcount),
            url: album.url
        }));

        res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=300');
        res.status(200).json({ albums });
    } catch {
        res.status(500).json({ error: 'Failed to fetch top albums', albums: [] });
    }
}