import { useState, useEffect } from "react"

const loadingMessages = [
    "Starting app...",
    "Loading configuration files...",
    "Fetching resources...",
    "Connecting to database...",
    "Setting up environment...",
    "Loading assets...",
    "Finalizing setup...",
    "Almost there...",
]

const Preloader: React.FC = () => {
    const [progress, setProgress] = useState(0)
    const [message, setMessage] = useState(loadingMessages[0])

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + 10
                if (newProgress <= 100) {
                    const messageIndex = Math.floor(newProgress / (100 / loadingMessages.length))
                    setMessage(loadingMessages[messageIndex] || "Loading...")
                }
                return newProgress >= 100 ? 100 : newProgress
            })
        }, 500)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-neutral-950 text-zinc-300">
            <p className="mb-6 text-sm font-light">Loading...</p>
            <div className="w-48 h-px bg-zinc-800 overflow-hidden mb-4">
                <div className="h-full bg-zinc-400 transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-xs text-zinc-500">{message}</p>
        </div>
    )
}

export default Preloader