import { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from "rehype-highlight";
import Head from 'next/head';

import MetaInfo from '@/components/(posts)/(slug)/MetaInfo';
import BlogContent from '@/components/(posts)/(slug)/BlogContent';
import { getViewCount, incrementViewCount } from '../../../lib/ViewsData';

import langPython from "highlight.js/lib/languages/python"
import langJava from "highlight.js/lib/languages/java"
import langCPP from "highlight.js/lib/languages/cpp"
import langCSS from "highlight.js/lib/languages/css"
import langHTML from "highlight.js/lib/languages/xml"
import langJS from "highlight.js/lib/languages/javascript"
import langBash from "highlight.js/lib/languages/bash"
import "highlight.js/styles/github-dark.css";

const languages = {
    cpp: langCPP,
    java: langJava,
    python: langPython,
    css: langCSS,
    html: langHTML,
    sh: langBash,
    js: langJS
};


interface Frontmatter {
    title: string;
    date: string;
    description: string;
    readTime: number;
}

interface BlogPostProps {
    frontMatter: Frontmatter & { slug: string };
    mdxSource: {
        compiledSource: string;
        renderedOutput: string;
        scope: Record<string, unknown>;
        frontmatter: unknown;
    };
}

const BlogPost: React.FC<BlogPostProps> = ({ frontMatter, mdxSource }) => {
    const { slug, title, date, description, readTime } = frontMatter;
    const [viewCount, setViewCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchViewCount = async () => {
            try {
                await incrementViewCount(slug);
                setViewCount(await getViewCount(slug));
            } catch (error) {
                console.error('Error getting view count:', error);
            }
        };

        fetchViewCount();
    }, [slug]);

    return (
        <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
            <Head>
                <title>{title}</title>
                <meta name="og:description" content={description} />
                <meta name="og:title" color={title} />
            </Head>
            <div className="py-28 text-center">
                <MetaInfo date={date} readTime={readTime} viewCount={viewCount} />
                <h1 className="text-5xl font-bold text-zinc-100">{title}</h1>
                <p className="text-lg mt-2 text-zinc-100">{description}</p>
            </div>
            <hr className='mt-8 mb-4' />
            <BlogContent mdxSource={mdxSource} />
        </div>
    );
};

export async function getStaticPaths() {
    const postsDirectory = path.join(process.cwd(), 'src', 'posts');
    const paths = fs.readdirSync(postsDirectory).map((fileName) => ({
        params: { slug: fileName.replace(/\.mdx$/, '') },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const filePath = path.join(process.cwd(), 'src', 'posts', `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontMatter, content } = matter(fileContent);

    const mdxSource = await serialize(content, {
        mdxOptions: {
            rehypePlugins: [[rehypeHighlight, {
                ignoreMissing: true,
                languages,
                aliases: {}
            }]] as any
        },
    });

    return { props: { frontMatter: { ...frontMatter, slug }, mdxSource } };
}

export default BlogPost;