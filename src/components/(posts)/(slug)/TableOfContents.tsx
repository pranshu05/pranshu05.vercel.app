"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp, AlignLeft } from "lucide-react"
import type { TocItem } from "@/lib/TocExtractor"

interface TableOfContentsProps {
    items: TocItem[]
}

export default function TableOfContents({ items }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("")
    const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false)

    useEffect(() => {
        if (!items || items.length === 0) return

        const headingElements = items
            .map((item) => document.getElementById(item.id))
            .filter((el): el is HTMLElement => el !== null)

        if (headingElements.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            {
                rootMargin: "0px 0px -70% 0px",
                threshold: 0.1,
            }
        )

        headingElements.forEach((el) => observer.observe(el))

        return () => {
            headingElements.forEach((el) => observer.unobserve(el))
        }
    }, [items])

    if (!items || items.length === 0) return null

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault()
        const element = document.getElementById(id)
        if (element) {
            const yOffset = -90
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
            window.scrollTo({ top: y, behavior: "smooth" })
            setActiveId(id)
            window.history.pushState(null, "", `#${id}`)
        }
    }

    return (
        <>
            <div className="2xl:hidden mb-8 border border-zinc-800 rounded-md bg-zinc-900/30 text-xs">
                <button onClick={() => setIsOpenMobile(!isOpenMobile)} className="w-full px-4 py-2.5 flex items-center justify-between font-medium text-zinc-300 hover:text-zinc-100 transition-colors">
                    <div className="flex items-center gap-2">
                        <AlignLeft className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Table of Contents ({items.length})</span>
                    </div>
                    {isOpenMobile ? <ChevronUp className="w-3.5 h-3.5 text-zinc-400" /> : <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />}
                </button>
                {isOpenMobile && (
                    <nav className="px-4 pb-3.5 pt-1 border-t border-zinc-800/80 max-h-60 overflow-y-auto space-y-1">
                        {items.map((item) => (
                            <a key={item.id} href={`#${item.id}`} onClick={(e) => { handleClick(e, item.id); setIsOpenMobile(false); }} className={`block py-1 transition-colors ${item.level === 3 ? "pl-4 text-zinc-400" : "pl-0 text-zinc-300 font-medium"} ${activeId === item.id ? "text-zinc-100 font-bold" : "hover:text-zinc-100"}`}>{item.text}</a>
                        ))}
                    </nav>
                )}
            </div>
            <aside className="hidden 2xl:block absolute left-[calc(100%+3.5rem)] top-0 bottom-0 w-60 text-xs pointer-events-none">
                <div className="sticky top-28 space-y-2.5 max-h-[calc(100vh-140px)] overflow-y-auto pr-2 pointer-events-auto">
                    <div className="flex items-center gap-1.5 font-semibold uppercase tracking-wider text-zinc-400 mb-2 text-[11px]">
                        <AlignLeft className="w-3.5 h-3.5 text-zinc-400" />
                        <span>On this page</span>
                    </div>
                    <nav className="space-y-1 border-l border-zinc-800">
                        {items.map((item) => {
                            const isSubItem = item.level === 3
                            const isActive = activeId === item.id
                            return (
                                <a key={item.id} href={`#${item.id}`} onClick={(e) => handleClick(e, item.id)} className={`block py-1 leading-snug transition-all ${isSubItem ? "pl-5 text-[11px]" : "pl-3 text-xs"} ${isActive ? "-ml-px border-l-2 border-zinc-200 text-zinc-100 font-semibold" : "text-zinc-400 hover:text-zinc-200 border-l border-transparent"}`}>{item.text}</a>
                            )
                        })}
                    </nav>
                </div>
            </aside>
        </>
    )
}