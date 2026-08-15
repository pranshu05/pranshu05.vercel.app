import { NextResponse } from "next/server"
import axios from "axios"
import type { UnsplashApiPhoto } from "@/lib/unsplashPhoto"
import { normalizeUnsplashPhoto } from "@/lib/unsplashPhoto"

export async function GET() {
    const unsplashKey = process.env.UNSPLASH_KEY
    if (!unsplashKey) {
        return NextResponse.json({ error: "Unsplash API key not configured on the server." }, { status: 500 })
    }

    try {
        const totalImages = 100
        const perPage = 30
        const totalPages = Math.ceil(totalImages / perPage)
        const imageRequests: Promise<any>[] = []

        for (let page = 1; page <= totalPages; page++) {
            imageRequests.push(
                axios.get<UnsplashApiPhoto[]>("https://api.unsplash.com/users/pranshu05/photos", {
                    params: { client_id: unsplashKey, per_page: perPage, page },
                }),
            )
        }

        const imageResponses = await Promise.all(imageRequests)
        const allImages = imageResponses.flatMap((response) => response.data)
        const allImageUrls = allImages.map((image: UnsplashApiPhoto) => normalizeUnsplashPhoto(image))

        return NextResponse.json({ images: allImageUrls })
    } catch {
        return NextResponse.json({ error: "Failed to fetch images from Unsplash." }, { status: 500 })
    }
}