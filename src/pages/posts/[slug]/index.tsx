import { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from "rehype-highlight";
import MetaTags from '@/components/SEO/MetaTags';
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

    const publishedTime = new Date(date).toISOString();
    const ogImage = `https://pranshu05.vercel.app/api/og?title=${encodeURIComponent(title)}`;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": description,
        "image": ogImage,
        "author": {
            "@type": "Person",
            "name": "Pranshu Patel",
            "url": "https://pranshu05.vercel.app"
        },
        "publisher": {
            "@type": "Person",
            "name": "Pranshu Patel",
            "url": "https://pranshu05.vercel.app"
        },
        "datePublished": publishedTime,
        "dateModified": publishedTime,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://pranshu05.vercel.app/posts/${slug}`
        },
        "wordCount": Math.ceil(readTime * 200),
        "timeRequired": `PT${readTime}M`,
        "articleSection": "Technology",
        "keywords": ["Programming", "Web Development", "Technology", "Tutorial"]
    };

    return (
        <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-3/5 2xl:w-1/2 max-w-3xl mx-auto">
            <MetaTags title={title} description={description} keywords={`${title}, Programming, Web Development, Technology, Tutorial, Pranshu Patel`} ogImage={ogImage} ogType="article" canonicalUrl={`/posts/${slug}`} publishedTime={publishedTime} modifiedTime={publishedTime} twitterCard="summary_large_image" structuredData={structuredData} />
            <div className="py-28 text-center">
                <MetaInfo date={date} readTime={readTime} viewCount={viewCount} />
                <h1 className="text-5xl font-bold text-zinc-100 mt-4 mb-6">{title}</h1>
                <p className="text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto">{description}</p>
            </div>
            <hr className='mt-8 mb-4 border-zinc-800' />
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