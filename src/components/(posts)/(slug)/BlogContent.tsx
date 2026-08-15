import type React from "react"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { InlineMath as KatexInlineMath, BlockMath as KatexBlockMath } from "react-katex"
import CodeBlock from "@/components/(posts)/(slug)/CodeBlock"
import Mermaid from "@/components/(posts)/(slug)/Mermaid"
import langPython from "highlight.js/lib/languages/python"
import langJava from "highlight.js/lib/languages/java"
import langCPP from "highlight.js/lib/languages/cpp"
import langCSS from "highlight.js/lib/languages/css"
import langHTML from "highlight.js/lib/languages/xml"
import langJS from "highlight.js/lib/languages/javascript"
import langBash from "highlight.js/lib/languages/bash"
import "katex/dist/katex.min.css"
import "@catppuccin/highlightjs/css/catppuccin-mocha.css"

const languages = {
    cpp: langCPP,
    java: langJava,
    python: langPython,
    css: langCSS,
    html: langHTML,
    sh: langBash,
    js: langJS,
}

interface BlogContentProps {
    content: string
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

export default function BlogContent({ content }: BlogContentProps) {
    return (
        <div className="post wrap-break-word w-full p-0 m-0">
            <MDXRemote source={content} components={components} options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [[rehypeHighlight, { ignoreMissing: true, languages, aliases: {}, },],] as any, }, }} />
        </div>
    )
}