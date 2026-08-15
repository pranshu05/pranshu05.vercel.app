import type { Metadata } from "next"
import type React from "react"
import { Space_Grotesk } from "next/font/google"
import "@/styles/globals.css"
import AppShell from "@/components/(layout)/AppShell"

const font = Space_Grotesk({
    weight: '400',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    metadataBase: new URL("https://pranshu05.vercel.app"),
    title: {
        default: "Pranshu Patel | Full Stack Developer Portfolio",
        template: "%s",
    },
    description: "Backend and full-stack developer; Kotlin, Spring Boot, Django, Next.js, TypeScript, PostgreSQL.",
    authors: [{ name: "Pranshu Patel", url: "https://pranshu05.vercel.app" }],
    creator: "Pranshu Patel",
    alternates: {
        types: {
            "application/rss+xml": "/rss.xml",
        },
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={font.className}>
            <body>
                <AppShell>{children}</AppShell>
            </body>
        </html>
    )
}