import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import BlogPostList from '@/components/(posts)/BlogPostList';
import { generateRSSFeed } from '../../lib/RSS';
import MetaTags from '@/components/SEO/MetaTags';

interface Frontmatter {
    title: string;
    date: string;
    description?: string;
}

export interface Post {
    slug: string;
    frontmatter: Frontmatter;
}

const Blog: React.FC<{ posts: Post[] }> = ({ posts }) => {
    const postsByYear = posts.reduce((acc, post) => {
        const year = new Date(post.frontmatter.date).getFullYear().toString();
        acc[year] = [...(acc[year] || []), post];
        return acc;
    }, {} as { [year: string]: Post[] });

    const sortedYears = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

    const title = "Technical Blog Posts | Pranshu05";
    const description = "Technical blog posts about web development, programming, and technology by Pranshu Patel. Covering React, Next.js, TypeScript, algorithms, and more.";
    const ogImage = `https://pranshu05.vercel.app/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Pranshu05 Technical Blog",
        "image": ogImage,
        "description": "Technical blog posts about web development, programming, and technology",
        "url": "https://pranshu05.vercel.app/posts",
        "author": {
            "@type": "Person",
            "name": "Pranshu Patel"
        },
        "blogPost": posts.slice(0, 10).map(post => ({
            "@type": "BlogPosting",
            "headline": post.frontmatter.title,
            "description": post.frontmatter.description || "",
            "url": `https://pranshu05.vercel.app/posts/${post.slug}`,
            "datePublished": new Date(post.frontmatter.date).toISOString(),
            "author": {
                "@type": "Person",
                "name": "Pranshu Patel"
            }
        }))
    };

    return (
        <>
            <MetaTags title="Technical Blog Posts | Pranshu05" ogImage={ogImage} description="Technical blog posts about web development, programming, and technology by Pranshu Patel. Covering React, Next.js, TypeScript, algorithms, and more." keywords="Technical Blog, Programming, Web Development, React, Next.js, TypeScript, JavaScript, Tutorials, Pranshu Patel" canonicalUrl="/posts" structuredData={structuredData} />
            <div className='w-11/12 md:w-4/5 lg:w-3/4 xl:w-3/5 2xl:w-1/2 max-w-3xl mx-auto'>
                <h1 className='text-2xl font-bold text-zinc-100 mb-6'>Technical Blog</h1>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">Welcome to my technical blog! I write about web development, programming concepts, and the latest in tech. Dive into topics covering React, Next.js, TypeScript, algorithms, and more. My RSS feed is available at{' '}<a className="link" href="/rss.xml" target="_blank" rel="noopener noreferrer">RSS Feed</a>. 🚀</p>
                {sortedYears.map((year) => (
                    <div key={year}>
                        <h2 className="text-xl font-bold my-4 text-zinc-100 border-b border-zinc-800 pb-4">{year}</h2>
                        <BlogPostList posts={postsByYear[year]} />
                    </div>
                ))}
            </div>
        </>
    );
};

export async function getStaticProps() {
    const postsDirectory = path.join(process.cwd(), 'src', 'posts');
    const files = fs.readdirSync(postsDirectory);

    const posts = files.map((fileName) => {
        const filePath = path.join(postsDirectory, fileName);
        const { data } = matter(fs.readFileSync(filePath, 'utf-8'));

        return {
            slug: fileName.replace(/\.mdx$/, ''),
            frontmatter: {
                title: data.title || '',
                date: data.date || '',
                description: data.description || ''
            },
        };
    });

    posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

    const rss = generateRSSFeed(posts);
    fs.writeFileSync(path.join(process.cwd(), 'public', 'rss.xml'), rss);

    return { props: { posts } };
}

export default Blog;