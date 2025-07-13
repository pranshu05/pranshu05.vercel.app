import Head from 'next/head';

interface MetaTagsProps {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
    ogType?: string;
    canonicalUrl?: string;
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    twitterCard?: string;
    structuredData?: object;
}

const MetaTags: React.FC<MetaTagsProps> = ({ title, description, keywords = "Pranshu Patel, Pranshu05, Portfolio, Developer, Designer, Engineer, Full Stack Developer, React, Next.js, TypeScript, JavaScript", ogType = "website", canonicalUrl, publishedTime, modifiedTime, author = "Pranshu Patel", twitterCard = "summary_large_image", structuredData, ogImage }) => {
    const siteUrl = "https://pranshu05.vercel.app";
    const fullTitle = title.includes("Pranshu05") ? title : `${title} | Pranshu05`;

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            {canonicalUrl && <link rel="canonical" href={`${siteUrl}${canonicalUrl}`} />}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl} />
            <meta property="og:image" content={ogImage || `${siteUrl}/images/og-image.png`} />
            <meta property="og:site_name" content="Pranshu05 Portfolio" />
            <meta property="og:locale" content="en_US" />
            {publishedTime && <meta property="article:published_time" content={publishedTime} />}
            {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
            {author && <meta property="article:author" content={author} />}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:site" content="@pranshu_05" />
            <meta name="twitter:creator" content="@pranshu_05" />
            <meta name="twitter:image" content={ogImage} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:creator" content="@pranshu_05" />
            <meta name="twitter:site" content="@pranshu_05" />
            <meta name="theme-color" content="#0a0a0a" />
            <meta name="msapplication-TileColor" content="#0a0a0a" />
            {structuredData && (<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />)}
        </Head>
    );
};

export default MetaTags;