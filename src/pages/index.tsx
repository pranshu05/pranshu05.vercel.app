import dynamic from "next/dynamic";
import MetaTags from "@/components/SEO/MetaTags";

const HomeContainer = dynamic(() => import("@/components/(home)/HomeContainer"), {
    ssr: false,
});

const Home: React.FC = () => {
    const title = "Pranshu Patel | Full Stack Developer Portfolio";
    const description = "Backend and full-stack developer, B.Tech ICT at Dhirubhai Ambani University (Gandhinagar). Kotlin, Spring Boot, Django, Next.js, TypeScript, PostgreSQL. Open to remote. Projects, writing, photography.";
    const ogImage = `https://pranshu05.vercel.app/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
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
            "Kotlin",
            "Spring Boot",
            "C++",
            "Python",
            "Django",
            "TypeScript",
            "JavaScript",
            "React",
            "Next.js",
            "Node.js",
            "Express.js",
            "PostgreSQL",
            "MongoDB",
            "Redis",
            "Web Development",
            "Backend Development"
        ]
    };

    return (
        <>
            <MetaTags title="Pranshu05 | Full Stack Developer Portfolio" ogImage={ogImage} description={description} keywords="Pranshu Patel, Pranshu05, Backend Developer, Spring Boot, Kotlin, Django, Next.js, TypeScript, PostgreSQL, Spotify, Portfolio, India, DAU, Open to remote" canonicalUrl="/" structuredData={structuredData} />
            <HomeContainer />
        </>
    )
}

export default Home;