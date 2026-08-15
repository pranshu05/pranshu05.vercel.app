import type { Metadata } from "next"
import HomeContainer from "@/components/(home)/HomeContainer"

const title = "Pranshu Patel | Full Stack Developer Portfolio"
const description = "Backend and full-stack developer, B.Tech ICT at Dhirubhai Ambani University (Gandhinagar). Kotlin, Spring Boot, Django, Next.js, TypeScript, PostgreSQL. Open to remote. Projects, writing, photography."
const ogImage = `https://pranshu05.vercel.app/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

export const metadata: Metadata = {
    title: "Pranshu05 | Full Stack Developer Portfolio",
    description,
    keywords: ["Pranshu Patel", "Pranshu05", "Backend Developer", "Spring Boot", "Kotlin", "Django", "Next.js", "TypeScript", "PostgreSQL", "Spotify", "Portfolio", "India", "DAU", "Open to remote"],
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title,
        description,
        url: "https://pranshu05.vercel.app",
        images: [{ url: ogImage }],
        type: "website",
    },
}

export default function HomePage() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Pranshu Patel",
        "image": ogImage,
        "alternateName": "Pranshu05",
        "description": "Backend and full-stack developer; Kotlin, Spring Boot, Django, Next.js, TypeScript, PostgreSQL, Node.js",
        "url": "https://pranshu05.vercel.app",
        "sameAs": [
            "https://github.com/pranshu05",
            "https://linkedin.com/in/pranshu05",
            "https://twitter.com/pranshu_05",
            "https://instagram.com/pranshu.05"
        ],
        "jobTitle": "Software Engineer",
        "worksFor": {
            "@type": "EducationalOrganization",
            "name": "Dhirubhai Ambani University"
        },
        "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "Dhirubhai Ambani University"
        },
        "knowsAbout": [
            "Kotlin", "Spring Boot", "C++", "Python", "Django", "TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "Redis", "Web Development", "Backend Development"
        ]
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
            <HomeContainer />
        </>
    )
}