import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Pranshu05 // Posts',
    description: 'My personal Blogs',
}

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

const Blog: React.FC<BlogProps> = ({ posts }) => (
    <div className='w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto'>
        <div className='pb-8'>
            <h1 className='text-3xl font-bold'>Blogs</h1>
            <p>Welcome to my blog page! I write some cool stuff here. Feel free to read 😅</p>
        </div>
        <ul className='w-full p-2 break-words whitespace-normal'>
            {posts.map(({ slug, frontmatter }) => (
                <li key={slug} className='my-2'>
                    <Link href={`/posts/${slug}`} passHref>
                        <div className='w-full flex justify-between items-baseline font-lg link'>
                            {frontmatter.title}
                            <span className='text-zinc-400 text-sm'>{frontmatter.date}</span>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

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