import React, { useState, useEffect } from 'react';

const loadingMessages = [
    "Starting app...",
    "Loading configuration files...",
    "Fetching resources...",
    "Connecting to database...",
    "Setting up environment...",
    "Loading assets...",
    "Finalizing setup...",
    "Almost there..."
];

const Preloader: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState(loadingMessages[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + 10;
                if (newProgress <= 100) {
                    const messageIndex = Math.floor(newProgress / (100 / loadingMessages.length));
                    setMessage(loadingMessages[messageIndex] || "Loading...");
                }
                return newProgress >= 100 ? 100 : newProgress;
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-neutral-950 text-zinc-300">
            <p className="mb-4 text-lg">Loading...</p>
            <div className="w-3/4 h-2 bg-zinc-700 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-zinc-300 rounded-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div></div>
            <p className="mt-2 text-sm text-zinc-400">{message}</p>
        </div>
    );
};

export default Preloader;