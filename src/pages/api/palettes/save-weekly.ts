import { NextApiRequest, NextApiResponse } from 'next';
import { paletteDB, getWeekNumber } from '@/lib/PaletteDB';

function validateAuth(req: NextApiRequest): boolean {
    const apiKey = req.headers['x-api-key'] || req.headers['authorization'];
    const expectedKey = process.env.PALETTE_API_SECRET;

    if (!expectedKey) {
        console.warn('PALETTE_API_SECRET environment variable not set');
        return false;
    }

    if (!apiKey) {
        return false;
    }

    const token = typeof apiKey === 'string' ? apiKey.replace('Bearer ', '') : apiKey[0];

    return token === expectedKey;
}

function validateColors(colors: any): colors is string[] {
    if (!Array.isArray(colors)) {
        return false;
    }

    const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
    return colors.every(color => typeof color === 'string' && hexColorRegex.test(color));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed',
            message: 'This endpoint only accepts POST requests'
        });
    }

    // Validate authentication
    if (!validateAuth(req)) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Missing or invalid API key. Include x-api-key header with your PALETTE_API_SECRET'
        });
    }

    try {
        const now = new Date();
        const { colors, week: requestedWeek, year: requestedYear } = req.body;

        const week = requestedWeek || getWeekNumber(now);
        const year = requestedYear || now.getFullYear();

        const existing = await paletteDB.getPaletteByWeek(week, year);
        if (existing) {
            return res.status(409).json({
                error: 'Palette for this week already exists',
                week,
                year,
                existingPaletteId: existing.id,
                existingColors: existing.colors,
                message: 'Delete the existing palette first or wait for next week'
            });
        }

        if (!colors) {
            return res.status(400).json({
                error: 'Missing colors',
                message: 'Request body must include a "colors" array with hex color strings',
                example: {
                    colors: ['#ecdcbc', '#fcd46c', '#3cb44c', '#ecd4bc', '#2c2c2c', '#8c8c8c', '#0c0c0c', '#c4c4c4', '#2c3414', '#fcfcfc']
                }
            });
        }

        if (!validateColors(colors)) {
            return res.status(400).json({
                error: 'Invalid colors format',
                message: 'Colors must be an array of hex color strings (e.g., "#ecdcbc")',
                received: colors
            });
        }

        const finalColors = colors.slice(0, 10);

        if (finalColors.length === 0) {
            return res.status(400).json({
                error: 'No colors provided',
                message: 'At least one color is required'
            });
        }

        const docId = await paletteDB.saveWeeklyPalette(finalColors, week, year);

        return res.status(200).json({
            success: true,
            message: 'Weekly palette saved successfully',
            docId,
            week,
            year,
            colorCount: finalColors.length,
            colors: finalColors,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Error in save weekly palette:', error);

        if (error instanceof Error) {
            if (error.message.includes('already exists')) {
                return res.status(409).json({
                    error: 'Palette for this week already exists',
                    message: error.message,
                });
            }
        }

        return res.status(500).json({
            error: 'Failed to save palette',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}