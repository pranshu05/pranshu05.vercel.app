import type React from "react"
import { MDXRemote } from "next-mdx-remote"
import { InlineMath as KatexInlineMath, BlockMath as KatexBlockMath } from "react-katex"
import CodeBlock from "@/components/(posts)/(slug)/CodeBlock"
import Mermaid from "@/components/(posts)/(slug)/Mermaid"
import "katex/dist/katex.min.css"

interface BlogContentProps {
    mdxSource: {
        compiledSource: string
        renderedOutput: string
        scope: Record<string, unknown>
        frontmatter: unknown
    }
}

const extractMathString = (props: any): string => {
    if (typeof props.math === "string") return props.math
    if (typeof props.children === "string") return props.children
    if (Array.isArray(props.children)) {
        return props.children
            .map((child) => (typeof child === "string" ? child : String(child || "")))
            .join("")
    }
    if (props.children) return String(props.children)
    return ""
}

const SafeInlineMath: React.FC<any> = (props) => {
    const math = extractMathString(props)
    return <KatexInlineMath math={math} />
}

const SafeBlockMath: React.FC<any> = (props) => {
    const math = extractMathString(props)
    return <KatexBlockMath math={math} />
}

const components = {
    InlineMath: SafeInlineMath,
    BlockMath: SafeBlockMath,
    Mermaid,
    pre: CodeBlock,
}

const BlogContent: React.FC<BlogContentProps> = ({ mdxSource }) => (
    <div className="post wrap-break-word w-full p-0 m-0">
        <MDXRemote {...mdxSource} components={components} />
    </div>
)

export default BlogContent