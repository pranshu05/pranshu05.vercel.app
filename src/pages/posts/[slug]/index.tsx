import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import rehypePrism from 'rehype-prism';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import 'prism-themes/themes/prism-holi-theme.css';

interface Frontmatter {
    title: string;
    date: string;
    readTime: number;
}

interface BlogPostProps {
    frontMatter: Frontmatter;
    mdxSource: {
        compiledSource: string;
        renderedOutput: string;
        scope: Record<string, unknown>;
    };
}

const components = {};

const BlogPost: React.FC<BlogPostProps> = ({ frontMatter, mdxSource }) => {
    if (!frontMatter) {
        return <div>Error: Front matter not available</div>;
    }

    const { title, date, readTime } = frontMatter;

    return (
        <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
            <div className='pb-8'>
                <h1 className='text-3xl font-bold'>{title}</h1>
                <div className='text-zinc-400 flex items-baseline text-base'>
                    📅 {date} • ⏰ {readTime} minutes
                </div>
            </div>
            <div className='post break-words w-full p-0 m-0'>
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
            rehypePlugins: [
                [rehypePrism, {
                    ignoreMissing: true,
                    aliases: {}
                }],
            ],
        },
    });

    return {
        props: {
            frontMatter,
            mdxSource,
        },
    };
}

export default BlogPost;
