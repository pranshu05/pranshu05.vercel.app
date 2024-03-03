import { useEffect, useState } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from 'rehype-prism';
import fs from 'fs';
import path from 'path';
import MetaInfo from '@/components/(posts)/(slug)/MetaInfo';
import BlogContent from '@/components/(posts)/(slug)/BlogContent';
import { getViewCount, incrementViewCount } from '../../../lib/ViewsData';
import matter from 'gray-matter';
import 'prism-themes/themes/prism-atom-dark.css';

interface Frontmatter {
    title: string;
    date: string;
    readTime: number;
    img: string;
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
    const { slug, title, date, readTime, img } = frontMatter;
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
            <div className="py-28 text-center bg-contain bg-no-repeat bg-center bg-fixed" style={{ backgroundImage: `url(${img})` }}>
                <MetaInfo date={date} readTime={readTime} viewCount={viewCount} />
                <h1 className="text-6xl font-bold text-zinc-100">{title}</h1>
            </div>
            <hr className='my-4' />
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
        mdxOptions: { rehypePlugins: [[rehypePrism, { ignoreMissing: true, aliases: {} }] as any] },
    });

    return { props: { frontMatter: { ...frontMatter, slug }, mdxSource } };
}

export default BlogPost;