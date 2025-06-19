import { useEffect, useState } from "react"
import { Space_Grotesk } from "next/font/google"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import NavBar from "@/components/(layout)/NavBar"
import Footer from "@/components/(layout)/Footer"
import Preloader from "@/components/(layout)/Preloader"
import CRTOverlay from "@/components/(layout)/CRTOverlay"

const font = Space_Grotesk({
    weight: '400',
    subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
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
            <div className={`main-content ${!isLoading ? "main-content-loaded" : ""} min-h-dvh w-[dvw - 5px] p-0 m-0 bg-neutral-950 text-zinc-300 flex flex-col ${font.className}`}>
                <NavBar />
                <div className="flex-1">
                    <Component {...pageProps} />
                </div>
                <Footer />
            </div>
            <CRTOverlay />
        </>
    )
}