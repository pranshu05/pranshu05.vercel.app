import { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getViewCount } from '../../lib/ViewsData';
import BlogPageHeader from '@/components/(posts)/BlogPageHeader';
import BlogPostList from '@/components/(posts)/BlogPostList';

interface Frontmatter {
    title: string;
    date: string;
    description: string;
    readTime: number;
    img: string;
}

interface Post {
    slug: string;
    frontmatter: Frontmatter;
}

const Blog: React.FC<{ posts: Post[] }> = ({ posts }) => {
    const [viewCounts, setViewCounts] = useState<{ [key: string]: number }>({});

    const postsByYear: { [year: string]: Post[] } = posts.reduce((acc, post) => {
        const year = post.frontmatter.date.slice(-4);
        acc[year] = [...(acc[year] || []), post];
        return acc;
    }, {});

    useEffect(() => {
        const fetchViewCounts = async () => {
            const counts = await Promise.all(posts.map(({ slug }) => getViewCount(slug)));
            setViewCounts(Object.fromEntries(posts.map((post, i) => [post.slug, counts[i]])));
        };

        fetchViewCounts();
    }, [posts]);

    return (
        <div data-aos="fade-up" className='w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto'>
            <BlogPageHeader />
            {Object.entries(postsByYear).map(([year, yearPosts]) => (
                <div key={year}>
                    <h2 className='text-2xl font-bold'>{year}</h2>
                    <hr className='g-hr' />
                    <BlogPostList posts={yearPosts} viewCounts={viewCounts} />
                </div>
            ))}
        </div>
    );
};

export async function getStaticProps() {
    const posts = fs.readdirSync(path.join(process.cwd(), 'src', 'posts')).map((fileName) => {
        const filePath = path.join(process.cwd(), 'src', 'posts', fileName);
        const { data } = matter(fs.readFileSync(filePath, 'utf-8'));

        return {
            slug: fileName.replace(/\.mdx$/, ''),
            frontmatter: {
                title: data.title || '',
                date: data.date || '',
                description: data.description || '',
                readTime: data.readTime || 0,
                img: data.img || '',
            },
        };
    });

    posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

    return { props: { posts } };
}

export default Blog;