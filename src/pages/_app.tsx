import { useEffect } from 'react'
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/(layout)/NavBar";
import Footer from "@/components/(layout)/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        AOS.init({
            duration: 800,
            delay: 50,
            once: false,
            easing: 'ease-in-out',
            mirror: false,
            offset: 50,
        })
    }, [])

    return (
        <div className="min-h-dvh w-dvw p-0 m-0 bg-neutral-950 text-zinc-300 flex flex-col">
            <NavBar />
            <div className="flex-1">
                <Component {...pageProps} />
            </div>
            <Footer />
        </div>
    );
}