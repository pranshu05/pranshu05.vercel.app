import { NextApiRequest, NextApiResponse } from 'next';
import { paletteDB, getWeekNumber } from '@/lib/PaletteDB';

interface LastFmArtist {
    name: string;
    mbid: string;
    image: Array<{ '#text': string; size: string }>;
    url: string;
}

interface LastFmResponse {
    topartists: { artist: LastFmArtist[] };
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

        return artist.images?.[0]?.url || null;
    } catch {
        return null;
    }
}

async function extractDominantColorsFromImageUrl(imageUrl: string, colorCount: number = 6): Promise<string[]> {
    try {
        const colorPaletteUrl = `https://api.color.pizza/v1/?values=${encodeURIComponent(imageUrl)}`;

        try {
            const colorResponse = await fetch(colorPaletteUrl, {
                signal: AbortSignal.timeout(5000)
            });
            if (colorResponse.ok) {
                const colorData = await colorResponse.json();
                if (colorData.colors && Array.isArray(colorData.colors)) {
                    return colorData.colors.slice(0, colorCount);
                }
            }
        } catch (error) {
            console.error('Color API error:', error);
        }

        return generatePaletteFromUrl(imageUrl, colorCount);
    } catch (error) {
        console.error('Error extracting colors from image:', error);
        return [];
    }
}

function generatePaletteFromUrl(url: string, count: number): string[] {
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
        const char = url.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
        const hue = ((hash + i * 360 / count) % 360);
        const saturation = 70 + (i % 3) * 10;
        const lightness = 50 + (i % 2) * 10;

        const hex = hslToHex(hue, saturation, lightness);
        colors.push(hex);
    }

    return colors;
}

function hslToHex(h: number, s: number, l: number): string {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function validateAuth(req: NextApiRequest): boolean {
    // Check for API key in header
    const apiKey = req.headers['x-api-key'] || req.headers['authorization'];
    const expectedKey = process.env.PALETTE_API_SECRET;
    
    if (!expectedKey) {
        console.warn('PALETTE_API_SECRET environment variable not set');
        return false;
    }
    
    if (!apiKey) {
        return false;
    }
    
    // Handle both "Bearer TOKEN" and direct token formats
    const token = typeof apiKey === 'string' 
        ? apiKey.replace('Bearer ', '') 
        : apiKey[0];
    
    return token === expectedKey;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Validate authentication
    if (!validateAuth(req)) {
        return res.status(401).json({ 
            error: 'Unauthorized',
            message: 'Missing or invalid API key'
        });
    }

    try {
        const now = new Date();
        const week = getWeekNumber(now);
        const year = now.getFullYear();

        const existing = await paletteDB.getPaletteByWeek(week, year);
        if (existing) {
            return res.status(409).json({
                error: 'Palette for this week already exists',
                week,
                year,
                existingPaletteId: existing.id,
            });
        }

        const apiKey = process.env.LASTFM_KEY;
        const username = process.env.LASTFM_USERNAME || 'pranshu05';

        if (!apiKey) {
            return res.status(500).json({ error: 'Last.fm API key not configured' });
        }

        const lastFmUrl = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${apiKey}&period=7day&limit=6&format=json`;

        const lastFmResponse = await fetch(lastFmUrl);
        if (!lastFmResponse.ok) {
            throw new Error(`Last.fm API error: ${lastFmResponse.status}`);
        }

        const lastFmData: LastFmResponse = await lastFmResponse.json();
        if (!lastFmData.topartists || !lastFmData.topartists.artist) {
            throw new Error('Invalid Last.fm response');
        }

        const spotifyToken = await getSpotifyToken();
        if (!spotifyToken) {
            return res.status(500).json({ error: 'Failed to authenticate with Spotify' });
        }

        const allColors: string[] = [];
        const colorCountPerArtist = 6;
        const processedArtists: { name: string; colorCount: number }[] = [];

        for (const artist of lastFmData.topartists.artist) {
            try {
                const spotifyImage = await searchSpotifyArtist(artist.name, spotifyToken);

                if (spotifyImage) {
                    const colors = await extractDominantColorsFromImageUrl(spotifyImage, colorCountPerArtist);
                    if (colors.length > 0) {
                        allColors.push(...colors);
                        processedArtists.push({
                            name: artist.name,
                            colorCount: colors.length,
                        });
                    }
                }

                await new Promise(resolve => setTimeout(resolve, 150));
            } catch (error) {
                console.error(`Error processing artist ${artist.name}:`, error);
            }
        }

        let finalColors = allColors.slice(0, 12);

        if (finalColors.length === 0) {
            finalColors = [
                '#FF6B6B',
                '#4ECDC4',
                '#45B7D1',
                '#FFA07A',
                '#98D8C8',
                '#F7DC6F',
                '#BB8FCE',
                '#85C1E2',
                '#F8B195',
                '#C39BD3',
                '#ABEBC6',
                '#F5B7B1',
            ];
        }

        const docId = await paletteDB.saveWeeklyPalette(finalColors);

        return res.status(200).json({
            success: true,
            message: 'Weekly palette auto-saved successfully',
            docId,
            week,
            year,
            colorCount: finalColors.length,
            colors: finalColors,
            artistsProcessed: processedArtists.length,
            processedArtists,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Error in auto-save weekly palette:', error);

        if (error instanceof Error) {
            if (error.message.includes('already exists')) {
                return res.status(409).json({
                    error: 'Palette for this week already exists',
                    message: error.message,
                });
            }
        }

        return res.status(500).json({
            error: 'Failed to auto-save palette',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}