"use client"
import type React from "react"
import { useEffect, useState } from "react"
import NavBar from "@/components/(layout)/NavBar"
import Footer from "@/components/(layout)/Footer"
import Preloader from "@/components/(layout)/Preloader"

export default function AppShell({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const handleLoadProgress = () => {
            let progress = 0
            const interval = setInterval(() => {
                progress += 10
                if (progress >= 100) {
                    clearInterval(interval)
                    setIsLoading(false)
                }
            }, 100)
        }

        if (document.readyState === "complete") {
            handleLoadProgress()
        } else {
            window.addEventListener("load", handleLoadProgress)
        }

        return () => window.removeEventListener("load", handleLoadProgress)
    }, [])

    return (
        <>
            {isLoading && <Preloader />}
            <div className={`main-content ${!isLoading ? "main-content-loaded" : ""} min-h-dvh w-full p-0 m-0 bg-neutral-950 text-zinc-300 flex flex-col`}>
                <NavBar />
                <div className="flex-1">
                    {children}
                </div>
                <Footer />
            </div>
        </>
    )
}