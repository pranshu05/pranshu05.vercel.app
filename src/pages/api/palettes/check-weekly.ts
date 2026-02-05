import { NextApiRequest, NextApiResponse } from 'next';
import { paletteDB } from '@/lib/PaletteDB';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { week, year } = req.query;

        if (!week || !year) {
            return res.status(400).json({ error: 'week and year parameters are required' });
        }

        const weekNum = parseInt(week as string);
        const yearNum = parseInt(year as string);

        if (isNaN(weekNum) || isNaN(yearNum)) {
            return res.status(400).json({ error: 'Invalid week or year parameter' });
        }

        const palette = await paletteDB.getPaletteByWeek(weekNum, yearNum);

        return res.status(200).json({
            exists: palette !== null,
            week: weekNum,
            year: yearNum,
            palette: palette || null,
        });
    } catch (error) {
        console.error('Error checking palette:', error);

        return res.status(500).json({
            error: 'Failed to check palette',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}