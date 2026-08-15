import { NextResponse } from "next/server"
import axios from "axios"
import type { UnsplashApiPhoto } from "@/lib/unsplashPhoto"
import { normalizeUnsplashPhoto } from "@/lib/unsplashPhoto"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')?.trim() || ""

    if (!id) {
        return NextResponse.json({ error: "Missing photo id" }, { status: 400 })
    }

    const unsplashKey = process.env.UNSPLASH_KEY
    if (!unsplashKey) {
        return NextResponse.json({ error: "Unsplash API key not configured on the server." }, { status: 500 })
    }

    try {
        const { data } = await axios.get<UnsplashApiPhoto>(
            `https://api.unsplash.com/photos/${encodeURIComponent(id)}`,
            { params: { client_id: unsplashKey } }
        )
        const photo = normalizeUnsplashPhoto(data)
        return NextResponse.json({ exif: photo.exif })
    } catch {
        return NextResponse.json({ error: "Failed to fetch photo from Unsplash." }, { status: 500 })
    }
}