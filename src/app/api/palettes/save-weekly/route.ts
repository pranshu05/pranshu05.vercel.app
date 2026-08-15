import { NextResponse } from 'next/server'
import { paletteDB, getWeekNumber } from '@/lib/PaletteDB'

function validateAuth(request: Request): boolean {
    const apiKey = request.headers.get('x-api-key') || request.headers.get('authorization')
    const expectedKey = process.env.PALETTE_API_SECRET

    if (!expectedKey) {
        console.warn('PALETTE_API_SECRET environment variable not set')
        return false
    }

    if (!apiKey) {
        return false
    }

    const token = apiKey.replace('Bearer ', '')

    return token === expectedKey
}

function validateColors(colors: any): colors is string[] {
    if (!Array.isArray(colors)) {
        return false
    }

    const hexColorRegex = /^#[0-9A-Fa-f]{6}$/
    return colors.every((color) => typeof color === 'string' && hexColorRegex.test(color))
}

export async function POST(request: Request) {
    if (!validateAuth(request)) {
        return NextResponse.json(
            {
                error: 'Unauthorized',
                message: 'Missing or invalid API key. Include x-api-key header with your PALETTE_API_SECRET',
            },
            { status: 401 }
        )
    }

    try {
        const body = await request.json()
        const now = new Date()
        const { colors, week: requestedWeek, year: requestedYear } = body

        const week = requestedWeek || getWeekNumber(now)
        const year = requestedYear || now.getFullYear()

        const existing = await paletteDB.getPaletteByWeek(week, year)
        if (existing) {
            return NextResponse.json(
                {
                    error: 'Palette for this week already exists',
                    week,
                    year,
                    existingPaletteId: existing.id,
                    existingColors: existing.colors,
                    message: 'Delete the existing palette first or wait for next week',
                },
                { status: 409 }
            )
        }

        if (!colors) {
            return NextResponse.json(
                {
                    error: 'Missing colors',
                    message: 'Request body must include a "colors" array with hex color strings',
                    example: {
                        colors: ['#ecdcbc', '#fcd46c', '#3cb44c', '#ecd4bc', '#2c2c2c', '#8c8c8c', '#0c0c0c', '#c4c4c4', '#2c3414', '#fcfcfc'],
                    },
                },
                { status: 400 }
            )
        }

        if (!validateColors(colors)) {
            return NextResponse.json(
                {
                    error: 'Invalid colors format',
                    message: 'Colors must be an array of hex color strings (e.g., "#ecdcbc")',
                    received: colors,
                },
                { status: 400 }
            )
        }

        const finalColors = colors.slice(0, 10)

        if (finalColors.length === 0) {
            return NextResponse.json(
                {
                    error: 'No colors provided',
                    message: 'At least one color is required',
                },
                { status: 400 }
            )
        }

        const docId = await paletteDB.saveWeeklyPalette(finalColors, week, year)

        return NextResponse.json({
            success: true,
            message: 'Weekly palette saved successfully',
            docId,
            week,
            year,
            colorCount: finalColors.length,
            colors: finalColors,
            timestamp: new Date().toISOString(),
        })
    } catch (error) {
        console.error('Error in save weekly palette:', error)

        if (error instanceof Error) {
            if (error.message.includes('already exists')) {
                return NextResponse.json(
                    {
                        error: 'Palette for this week already exists',
                        message: error.message,
                    },
                    { status: 409 }
                )
            }
        }

        return NextResponse.json(
            {
                error: 'Failed to save palette',
                message: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}