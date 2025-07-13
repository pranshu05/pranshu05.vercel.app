import AboutContainer from "@/components/(about)/AboutContainer"
import MetaTags from "@/components/SEO/MetaTags"

const AboutPage: React.FC = () => {
    const title = "About | Pranshu Patel";
    const description = "Learn more about Pranshu Patel - a full-stack developer and university student from India. Discover my journey, tech stack, projects, and interests in web development and photography.";
    const ogImage = `https://pranshu05.vercel.app/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "image": ogImage,
        "mainEntity": {
            "@type": "Person",
            "name": "Pranshu Patel",
            "alternateName": "Pranshu05",
            "description": "Full-stack developer and university student pursuing B.Tech in ICT from DA-IICT",
            "url": "https://pranshu05.vercel.app/about",
            "knowsAbout": [
                "React", "Next.js", "TypeScript", "JavaScript", "Node.js",
                "MongoDB", "Firebase", "Tailwind CSS", "Web Development"
            ],
            "hasOccupation": {
                "@type": "Occupation",
                "name": "Full Stack Developer"
            }
        }
    };

    return (
        <>
            <MetaTags title="About | Pranshu05" ogImage={ogImage} description="Learn more about Pranshu Patel - a full-stack developer and university student from India. Discover my journey, tech stack, projects, and interests in web development and photography." keywords="About Pranshu Patel, Full Stack Developer, React, Next.js, TypeScript, DA-IICT, Web Development, Programming, Tech Stack" canonicalUrl="/about" structuredData={structuredData} />
            <AboutContainer />
        </>
    )
}

export default AboutPage