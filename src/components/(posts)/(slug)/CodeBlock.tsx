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
    const lines = codeText.split('\n')
    if (lines[lines.length - 1] === '') {
        lines.pop()
    }

    return (
        <div className="relative group">
            <pre style={{ display: 'flex' }}>
                <span className="select-none pr-4 text-gray-500 border-r border-gray-600/50" style={{ userSelect: 'none', textAlign: 'right', fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace", fontSize: '0.875rem', lineHeight: '1.7', paddingTop: '0.5rem', paddingBottom: '0.5rem', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                    {lines.map((_, index) => (<div key={index}>{index + 1}</div>))}
                </span>
                {children}
            </pre>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <CopyButton text={codeText} />
            </div>
        </div>
    )
}

export default CodeBlock