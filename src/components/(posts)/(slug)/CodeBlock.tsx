"use client"
import type { ReactNode } from "react"
import type React from "react"
import CopyButton from "@/components/UI/CopyButton"

interface CodeBlockProps {
    children: ReactNode
    className?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
    const getTextContent = (node: ReactNode): string => {
        if (typeof node === "string") {
            return node
        }
        if (typeof node === "number") {
            return node.toString()
        }
        if (Array.isArray(node)) {
            return node.map(getTextContent).join("")
        }
        if (node && typeof node === "object" && "props" in node) {
            return getTextContent((node as any).props.children)
        }
        return ""
    }

    const codeText = getTextContent(children)

    return (
        <div className="relative group">
            <pre>{children}</pre>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"><CopyButton text={codeText} /></div>
        </div>
    )
}

export default CodeBlock