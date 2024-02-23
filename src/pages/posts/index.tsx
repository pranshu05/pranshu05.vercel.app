import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { useEffect, useState } from 'react';
import { Metadata } from 'next';
import { getViewCount } from '../../lib/ViewsData';
import BlogPageHeader from '@/components/(posts)/BlogPageHeader';
import BlogPostList from '@/components/(posts)/BlogPostList';

export const metadata: Metadata = {
    title: 'Pranshu05 // Posts',
    description: 'My personal Blogs',
};

interface Frontmatter {
    title: string;
    date: string;
    readTime: number;
}

interface Post {
    slug: string;
    frontmatter: Frontmatter;
}

interface BlogProps {
    posts: Post[];
}

const Blog: React.FC<BlogProps> = ({ posts }) => {
    const [viewCounts, setViewCounts] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fetchViewCounts = async () => {
            const counts = await Promise.all(posts.map(({ slug }) => getViewCount(slug)));
            const viewCountMap: { [key: string]: number } = {};
            posts.forEach(({ slug }, index) => {
                viewCountMap[slug] = counts[index];
            });
            setViewCounts(viewCountMap);
        };

        fetchViewCounts();
    }, [posts]);

    return (
        <div className='w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto'>
            <BlogPageHeader />
            <BlogPostList posts={posts} viewCounts={viewCounts} />
        </div>
    );
};

export async function getStaticProps() {
    const postsDirectory = path.join(process.cwd(), 'src', 'posts');
    const fileNames = fs.readdirSync(postsDirectory);

    const posts: Post[] = fileNames.map((fileName) => {
        const filePath = path.join(postsDirectory, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);

        const frontmatter: Frontmatter = {
            title: data.title || '',
            date: data.date || '',
            readTime: data.readTime || 0,
        };

        return {
            slug: fileName.replace(/\.mdx$/, ''),
            frontmatter,
        };
    });

    return {
        props: {
            posts,
        },
    };
}

export default Blog;