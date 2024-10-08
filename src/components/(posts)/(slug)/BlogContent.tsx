import { MDXRemote } from 'next-mdx-remote';
import { InlineMath, BlockMath } from 'react-katex'; 
import 'katex/dist/katex.min.css'; 

interface BlogContentProps {
    mdxSource: {
        compiledSource: string;
        renderedOutput: string;
        scope: Record<string, unknown>;
        frontmatter: unknown;
    };
}

const components = {
    InlineMath,
    BlockMath,
};

const BlogContent: React.FC<BlogContentProps> = ({ mdxSource }) => (
    <div className="post break-words w-full p-0 m-0">
        <MDXRemote {...mdxSource} components={components} />
    </div>
);

export default BlogContent;