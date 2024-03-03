import { MDXRemote } from 'next-mdx-remote';

interface BlogContentProps {
    mdxSource: {
        compiledSource: string;
        renderedOutput: string;
        scope: Record<string, unknown>;
        frontmatter: unknown;
    };
}

const components = {};

const BlogContent: React.FC<BlogContentProps> = ({ mdxSource }) => (
    <div className="post break-words w-full p-0 m-0">
        <MDXRemote {...mdxSource} components={components} />
    </div>
);

export default BlogContent;