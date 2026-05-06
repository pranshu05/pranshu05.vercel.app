import type { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import type { UnsplashApiPhoto } from "@/lib/unsplashPhoto"
import { normalizeUnsplashPhoto } from "@/lib/unsplashPhoto"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    const id = typeof req.query.id === "string" ? req.query.id.trim() : ""
    if (!id) {
        return res.status(400).json({ error: "Missing photo id" })
    }

    const unsplashKey = process.env.UNSPLASH_KEY
    if (!unsplashKey) {
        return res.status(500).json({ error: "Unsplash API key not configured on the server." })
    }

    try {
        const { data } = await axios.get<UnsplashApiPhoto>(`https://api.unsplash.com/photos/${encodeURIComponent(id)}`,{ params: { client_id: unsplashKey } },)
        const photo = normalizeUnsplashPhoto(data)
        res.status(200).json({ exif: photo.exif })
    } catch {
        res.status(500).json({ error: "Failed to fetch photo from Unsplash." })
    }
}