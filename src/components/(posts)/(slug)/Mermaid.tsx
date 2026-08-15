"use client"
import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import { ZoomIn, ZoomOut, RotateCcw, Move } from "lucide-react"

interface MermaidProps {
    chart?: string
    children?: React.ReactNode
}

const Mermaid: React.FC<MermaidProps> = ({ chart, children }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [svg, setSvg] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const [scale, setScale] = useState<number>(1)
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

    const content = chart || (typeof children === "string" ? children : "")

    useEffect(() => {
        if (!content.trim()) return

        let isMounted = true
        const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`

        const renderDiagram = async () => {
            try {
                const mermaid = (await import("mermaid")).default
                mermaid.initialize({
                    startOnLoad: false,
                    theme: "dark",
                    securityLevel: "loose",
                    fontFamily: "'JetBrains Mono', 'Inter', sans-serif",
                })
                const { svg: renderedSvg } = await mermaid.render(uniqueId, content.trim())
                if (isMounted) {
                    setSvg(renderedSvg)
                    setError(null)
                }
            } catch (err: any) {
                if (isMounted) {
                    setError(err?.message || "Failed to render Mermaid diagram")
                }
            }
        }

        renderDiagram()

        return () => {
            isMounted = false
        }
    }, [content])

    const handleZoomIn = useCallback(() => {
        setScale((prev) => Math.min(prev + 0.2, 3.5))
    }, [])

    const handleZoomOut = useCallback(() => {
        setScale((prev) => Math.max(prev - 0.2, 0.4))
    }, [])

    const handleReset = useCallback(() => {
        setScale(1)
        setPosition({ x: 0, y: 0 })
    }, [])

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        dragStartRef.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        }
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return
        setPosition({
            x: e.clientX - dragStartRef.current.x,
            y: e.clientY - dragStartRef.current.y,
        })
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            setIsDragging(true)
            dragStartRef.current = {
                x: e.touches[0].clientX - position.x,
                y: e.touches[0].clientY - position.y,
            }
        }
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || e.touches.length !== 1) return
        setPosition({
            x: e.touches[0].clientX - dragStartRef.current.x,
            y: e.touches[0].clientY - dragStartRef.current.y,
        })
    }

    const handleTouchEnd = () => {
        setIsDragging(false)
    }

    const handleWheel = (e: React.WheelEvent) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            const delta = e.deltaY < 0 ? 0.1 : -0.1
            setScale((prev) => Math.min(Math.max(prev + delta, 0.4), 3.5))
        }
    }

    if (error) {
        return (
            <div className="my-6 p-4 rounded-lg bg-red-950/40 border border-red-800 text-red-300 text-sm font-mono overflow-x-auto">
                <p className="font-bold mb-1">Mermaid Render Error:</p>
                <pre>{error}</pre>
                <pre className="mt-2 text-xs text-gray-400">{content}</pre>
            </div>
        )
    }

    return (
        <div className="relative group my-8 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md shadow-2xl overflow-hidden select-none">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10 text-xs text-gray-400">
                <div className="flex items-center space-x-2">
                    <Move className="w-3.5 h-3.5 text-gray-400" />
                    <span className="hidden sm:inline font-mono">Drag to pan | Ctrl+Scroll to zoom</span>
                    <span className="sm:hidden font-mono">Drag to pan</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-black/40 rounded-lg p-1 border border-white/10">
                    <button onClick={handleZoomOut} title="Zoom Out" className="p-1 rounded hover:bg-white/10 text-gray-300 transition-colors">
                        <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-[11px] px-1 text-gray-300 min-w-[40px] text-center">
                        {Math.round(scale * 100)}%
                    </span>
                    <button onClick={handleZoomIn} title="Zoom In" className="p-1 rounded hover:bg-white/10 text-gray-300 transition-colors">
                        <ZoomIn className="w-4 h-4" />
                    </button>
                    <div className="w-[1px] h-3 bg-white/20 mx-1" />
                    <button onClick={handleReset} title="Reset Diagram View" className="p-1 rounded hover:bg-white/10 text-gray-300 transition-colors">
                        <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
            <div className={`relative w-full min-h-[250px] p-6 flex justify-center items-center overflow-hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onWheel={handleWheel}>
                {svg ? (
                    <div ref={containerRef} className="mermaid-svg-container w-full flex justify-center transition-transform ease-out duration-75 origin-center" style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, }} dangerouslySetInnerHTML={{ __html: svg }} />
                ) : (
                    <div className="flex items-center space-x-2 text-gray-400 text-sm py-8">
                        <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                        <span>Rendering diagram...</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Mermaid