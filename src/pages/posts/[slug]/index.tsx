import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import rehypePrism from 'rehype-prism';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { useEffect, useState } from 'react';
import { getViewCount, incrementViewCount } from '../../../lib/ViewsData';

import 'prism-themes/themes/prism-atom-dark.css';

interface Frontmatter {
    title: string;
    date: string;
    readTime: number;
}

interface Post {
    slug: string;
    frontmatter: Frontmatter;
}

interface BlogPostProps {
    frontMatter: Frontmatter & { slug: string };
    mdxSource: {
        compiledSource: string;
        renderedOutput: string;
        scope: Record<string, unknown>;
    };
}

const components = {};

const BlogPost: React.FC<BlogPostProps> = ({ frontMatter, mdxSource }) => {
    const { slug, title, date, readTime } = frontMatter;
    const [viewCount, setViewCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchViewCount = async () => {
            try {
                await incrementViewCount(slug);
                const count = await getViewCount(slug);
                setViewCount(count);
            } catch (error) {
                console.error('Error getting view count:', error);
            }
        };

        fetchViewCount();
    }, [slug]);

    if (!frontMatter) {
        return (
            <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
                Error: Front matter not available
            </div>
        );
    }

    return (
        <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
            <div className="pb-8">
                <h1 className="text-3xl font-bold text-zinc-100">{title}</h1>
                <div className="text-zinc-400 flex items-baseline text-base">
                    {date} • {readTime} min read • {viewCount !== null ? viewCount : 'Loading'} views
                </div>
            </div>
            <div className="post break-words w-full p-0 m-0">
                <MDXRemote {...mdxSource} components={components} frontmatter={frontMatter} />
            </div>
        </div>
    );
};

export async function getStaticPaths() {
    const postsDirectory = path.join(process.cwd(), 'src', 'posts');
    const fileNames = fs.readdirSync(postsDirectory);

    const paths = fileNames.map((fileName) => ({
        params: {
            slug: fileName.replace(/\.mdx$/, ''),
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const postsDirectory = path.join(process.cwd(), 'src', 'posts');
    const filePath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontMatter, content } = matter(fileContent);

    const mdxSource = await serialize(content, {
        mdxOptions: {
            rehypePlugins: [[rehypePrism, { ignoreMissing: true, aliases: {} }] as any],
        },
    });

    return {
        props: {
            frontMatter: { ...frontMatter, slug },
            mdxSource,
        },
    };
}

export default BlogPost;