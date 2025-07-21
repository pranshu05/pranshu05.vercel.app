import type { NextApiRequest, NextApiResponse } from "next"
import axios, { all } from "axios"

interface UnsplashImage {
    urls: { regular: string }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    const unsplashKey = process.env.UNSPLASH_KEY
    if (!unsplashKey) {
        return res.status(500).json({ error: "Unsplash API key not configured on the server." })
    }

    try {
        const totalImages = 100
        const perPage = 30
        const totalPages = Math.ceil(totalImages / perPage)
        const imageRequests: Promise<any>[] = []

        for (let page = 1; page <= totalPages; page++) {
            imageRequests.push(
                axios.get<UnsplashImage[]>("https://api.unsplash.com/users/pranshu05/photos", {
                    params: { client_id: unsplashKey, per_page: perPage, page },
                }),
            )
        }

        const imageResponses = await Promise.all(imageRequests)
        const allImages = imageResponses.flatMap((response) => response.data)
        const allImageUrls = allImages.map((image) => ({
            urls: { regular: image.urls.regular },
        }))

        res.status(200).json({ images: allImageUrls })
    } catch {
        res.status(500).json({ error: "Failed to fetch images from Unsplash." })
    }
}