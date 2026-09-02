import type React from "react"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import katex from "katex"
import CodeBlock from "@/components/(posts)/(slug)/CodeBlock"
import Mermaid from "@/components/(posts)/(slug)/Mermaid"
import langPython from "highlight.js/lib/languages/python"
import langJava from "highlight.js/lib/languages/java"
import langCPP from "highlight.js/lib/languages/cpp"
import langCSS from "highlight.js/lib/languages/css"
import langHTML from "highlight.js/lib/languages/xml"
import langJS from "highlight.js/lib/languages/javascript"
import langBash from "highlight.js/lib/languages/bash"
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

const extractNodeText = (children: any): string => {
    if (typeof children === "string") return children
    if (typeof children === "number") return String(children)
    if (Array.isArray(children)) {
        return children.map(extractNodeText).join("")
    }
    if (children && typeof children === "object" && children.props && children.props.children) {
        return extractNodeText(children.props.children)
    }
    return ""
}

const slugify = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
}

const CustomH2: React.FC<any> = ({ children, ...props }) => {
    const text = extractNodeText(children)
    const id = slugify(text)
    return (
        <h2 id={id} className="scroll-mt-24" {...props}>{children}</h2>
    )
}

const CustomH3: React.FC<any> = ({ children, ...props }) => {
    const text = extractNodeText(children)
    const id = slugify(text)
    return (
        <h3 id={id} className="scroll-mt-24" {...props}>{children}</h3>
    )
}

const SafeInlineMath: React.FC<any> = (props) => {
    const math = extractMathString(props)
    let html: string | null = null
    try {
        html = katex.renderToString(math, { displayMode: false, throwOnError: false })
    } catch {
        html = null
    }

    if (html) {
        return <span dangerouslySetInnerHTML={{ __html: html }} />
    }
    return <span>{math}</span>
}

const SafeBlockMath: React.FC<any> = (props) => {
    const math = extractMathString(props)
    let html: string | null = null
    try {
        html = katex.renderToString(math, { displayMode: true, throwOnError: false })
    } catch {
        html = null
    }

    if (html) {
        return <div className="my-6 text-center overflow-x-auto" dangerouslySetInnerHTML={{ __html: html }} />
    }
    return <div>{math}</div>
}

const components = {
    h2: CustomH2,
    h3: CustomH3,
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