import type React from "react"
import { MDXRemote } from "next-mdx-remote"
import { InlineMath, BlockMath } from "react-katex"
import CodeBlock from "@/components/(posts)/(slug)/CodeBlock"
import "katex/dist/katex.min.css"

interface BlogContentProps {
    mdxSource: {
        compiledSource: string
        renderedOutput: string
        scope: Record<string, unknown>
        frontmatter: unknown
    }
}

const components = {
    InlineMath,
    BlockMath,
    pre: CodeBlock,
}

const BlogContent: React.FC<BlogContentProps> = ({ mdxSource }) => (
    <div className="post break-words w-full p-0 m-0">
        <MDXRemote {...mdxSource} components={components} />
    </div>
)

export default BlogContent