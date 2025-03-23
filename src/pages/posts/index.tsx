import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import BlogPostList from '@/components/(posts)/BlogPostList';
import { generateRSSFeed } from '../../lib/RSS';
import Head from 'next/head';

interface Frontmatter {
    title: string;
    date: string;
}

export interface Post {
    slug: string;
    frontmatter: Frontmatter;
}

const Blog: React.FC<{ posts: Post[] }> = ({ posts }) => {
    const postsByYear: { [year: string]: Post[] } = posts.reduce((acc, post) => {
        const year = post.frontmatter.date.slice(-4);
        acc[year] = [...(acc[year] || []), post];
        return acc;
    }, {});

    return (
        <>
            <Head>
                <title>Posts | Pranshu05</title>
                <meta name="description" content="Technical Blog-Page by Pranshu05." />
                <meta name="keywords" content="Pranshu Patel, Pranshu05, Portfolio, Developer, Designer, Engineer, Pranshu, Patel" />
                <meta name="author" content="Pranshu Patel" />
                <meta name="robots" content="index, follow" />
                <meta name="og:type" content="website" />
                <meta name="og:description" content="Technical Blog-Page by Pranshu05." />
                <meta name="og:title" content="Posts | Pranshu05" />
            </Head>
            <div className='w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto'>
                <h1 className='text-2xl font-bold text-zinc-100 mb-6'>Posts</h1>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">Welcome to my post page! I write about the coolest tech stuff, often with a sprinkle of math and physics. Dive in and enjoy the nerdy goodness! My RSS feed is available{' '}<a aria-label='Links do not have a discernible name' className="link" href="/rss.xml" target="_blank" rel="noopener noreferrer">RSS Feed</a>. 🚀</p>
                {Object.entries(postsByYear).map(([year, yearPosts]) => (
                    <div key={year}>
                        <h2 className="text-xl font-bold my-4 text-zinc-100 border-b border-zinc-800 pb-4">{year}</h2>
                        <BlogPostList posts={yearPosts} />
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
                date: data.date || ''
            },
        };
    });

    posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

    const rss = generateRSSFeed(posts);
    fs.writeFileSync(path.join(process.cwd(), 'public', 'rss.xml'), rss);

    return { props: { posts } };
}

export default Blog;