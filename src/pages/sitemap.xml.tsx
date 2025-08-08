import { GetServerSideProps } from 'next';
import fs from 'fs';
import path from 'path';

function generateSiteMap(posts: string[]) {
    const baseUrl = 'https://pranshu05.vercel.app';

    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${baseUrl}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>${baseUrl}/posts</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.9</priority>
        </url>
        <url>
            <loc>${baseUrl}/gallery</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.7</priority>
        </url>
        ${posts
            .map((slug) => {
                return `
                <url>
                    <loc>${baseUrl}/posts/${slug}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>0.8</priority>
                </url>
                `;
            })
            .join('')}
    </urlset>
    `;
}

function SiteMap() {
    // This component is not rendered, it's just used for generating the sitemap
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const postsDirectory = path.join(process.cwd(), 'src', 'posts');
    const files = fs.readdirSync(postsDirectory);
    const posts = files.map(fileName => fileName.replace(/\.mdx$/, ''));

    const sitemap = generateSiteMap(posts);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return { props: {} };
};

export default SiteMap;