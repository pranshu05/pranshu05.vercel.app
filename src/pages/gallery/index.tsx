import GalleryContainer from '@/components/(gallery)/GalleryContainer';
import MetaTags from '@/components/SEO/MetaTags';

const ImageGalleryPage: React.FC = () => {
    const title = "Photography Gallery | Pranshu05";
    const description = "Explore my photography gallery featuring campus birds and nature photography. Member of PMMC (Photography and Movie Making Club) at DA-IICT. View more on my Unsplash profile.";
    const ogImage = `https://pranshu05.vercel.app/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": "Pranshu05 Photography Gallery",
        "image": ogImage,
        "description": "Photography gallery showcasing campus birds and nature photography by Pranshu Patel",
        "url": "https://pranshu05.vercel.app/gallery",
        "author": {
            "@type": "Person",
            "name": "Pranshu Patel",
            "sameAs": "https://unsplash.com/@pranshu05"
        }
    };

    return (
        <>
            <MetaTags title="Photography Gallery | Pranshu05" description="Explore my photography gallery featuring campus birds and nature photography. Member of PMMC (Photography and Movie Making Club) at DA-IICT. View more on my Unsplash profile." keywords="Photography, Gallery, Nature Photography, Bird Photography, Campus Photography, PMMC, DA-IICT, Unsplash, Pranshu Patel" canonicalUrl="/gallery" structuredData={structuredData} />
            <GalleryContainer />
        </>
    )
}

export default ImageGalleryPage;