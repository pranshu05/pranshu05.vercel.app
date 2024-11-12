import { useEffect, useState } from "react";
import { Space_Grotesk } from 'next/font/google'
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/(layout)/NavBar";
import Footer from "@/components/(layout)/Footer";
import Preloader from '@/components/(layout)/Preloader';

const font = Space_Grotesk({
    weight: '400',
    subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            setTimeout(() => {
                setIsLoading(false);
            }, 1500); // 1.5-second delay for testing
        };

        (document.readyState === 'complete') ? handleLoad() : window.addEventListener('load', handleLoad);

        return () => window.removeEventListener('load', handleLoad);
    }, []);

    if (isLoading) {
        return <Preloader />;
    }

    return (
        <div className={`min-h-dvh w-[dvw - 10px] p-0 m-0 bg-neutral-950 text-zinc-300 flex flex-col ${font.className}`}>
            <NavBar />
            <div className="flex-1">
                <Component {...pageProps} />
            </div>
            <Footer />
        </div>
    );
}