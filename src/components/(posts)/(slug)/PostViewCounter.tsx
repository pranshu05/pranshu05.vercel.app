"use client"
import type React from "react"
import { useEffect, useState } from "react"
import MetaInfo from "@/components/(posts)/(slug)/MetaInfo"
import { getViewCount, incrementViewCount } from "@/lib/ViewsData"

interface PostViewCounterProps {
    slug: string
    date: string
    readTime: number
}

export default function PostViewCounter({ slug, date, readTime }: PostViewCounterProps) {
    const [viewCount, setViewCount] = useState<number | null>(null)

    useEffect(() => {
        const fetchViewCount = async () => {
            try {
                await incrementViewCount(slug)
                setViewCount(await getViewCount(slug))
            } catch {
                setViewCount(null)
            }
        }

        fetchViewCount()
    }, [slug])

    return <MetaInfo date={date} readTime={readTime} viewCount={viewCount} />
}
