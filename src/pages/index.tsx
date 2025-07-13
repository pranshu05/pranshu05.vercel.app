import dynamic from "next/dynamic";
import MetaTags from "@/components/SEO/MetaTags";

const HomeContainer = dynamic(() => import("@/components/(home)/HomeContainer"), {
    ssr: false,
});

const Home: React.FC = () => {
    const title = "Pranshu Patel | Full Stack Developer Portfolio";
    const description = "Full-stack developer and university student from India. Specializing in React, Next.js, TypeScript, and modern web technologies. Explore my projects, blog posts, and photography.";
    const ogImage = `https://pranshu05.vercel.app/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Pranshu Patel",
        "image": ogImage,
        "alternateName": "Pranshu05",
        "description": "Full-stack developer and university student specializing in React, Next.js, and modern web technologies",
        "url": "https://pranshu05.vercel.app",
        "sameAs": [
            "https://github.com/pranshu05",
            "https://linkedin.com/in/pranshu05",
            "https://twitter.com/pranshu_05",
            "https://instagram.com/pranshu.05"
        ],
        "jobTitle": "Full Stack Developer",
        "worksFor": {
            "@type": "EducationalOrganization",
            "name": "Dhirubhai Ambani Institute of Information and Communication Technology"
        },
        "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "Dhirubhai Ambani Institute of Information and Communication Technology"
        },
        "knowsAbout": [
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Node.js",
            "Web Development",
            "Full Stack Development"
        ]
    };

    return (
        <>
            <MetaTags title="Pranshu05 | Full Stack Developer Portfolio" ogImage={ogImage} description="Full-stack developer and university student from India. Specializing in React, Next.js, TypeScript, and modern web technologies. Explore my projects, blog posts, and photography." keywords="Pranshu Patel, Pranshu05, Full Stack Developer, React Developer, Next.js, TypeScript, JavaScript, Web Developer, Portfolio, India, DA-IICT" canonicalUrl="/" structuredData={structuredData} />
            <HomeContainer />
        </>
    )
}

export default Home;