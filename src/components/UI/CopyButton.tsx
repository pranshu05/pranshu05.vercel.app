"use client"
import { useState } from "react"
import { Copy, Check } from "lucide-react"

interface CopyButtonProps {
    text: string
    className?: string
}

const CopyButton: React.FC<CopyButtonProps> = ({ text, className = "" }) => {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            const textArea = document.createElement("textarea")
            textArea.value = text
            document.body.appendChild(textArea)
            textArea.select()
            try {
                document.execCommand("copy")
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch {
                setCopied(false)
            }
            document.body.removeChild(textArea)
        }
    }

    return (
        <button onClick={copyToClipboard} className={`group relative flex items-center justify-center w-8 h-8 rounded-md bg-zinc-800/50 hover:bg-zinc-700/70 border border-zinc-700/50 hover:border-zinc-600/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-900 ${className}`} aria-label={copied ? "Code copied!" : "Copy code to clipboard"} title={copied ? "Copied!" : "Copy code"}>
            {copied ? (<Check className="w-4 h-4 text-green-400" />) : (<Copy className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200 transition-colors" />)}
            <span className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-medium bg-zinc-800 text-zinc-200 rounded border border-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap ${copied ? "opacity-100" : ""}`}>{copied ? "Copied!" : "Copy"}</span>
        </button>
    )
}

export default CopyButton