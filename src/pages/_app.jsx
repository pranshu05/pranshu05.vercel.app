import "../styles/globals.css";
import { Footer } from "../components/Footer";

export const metadata = {
    title: 'Pranshu05',
    description: 'Pranshu Patel\'s personal website',
}

export default function App({ Component, pageProps }) {
    return (
        <>
            <div className="h-full w-full p-0 m-0 text-zinc-100">
                <Component {...pageProps} />
                <Footer />
            </div>
            <div className="fixed left-0 top-0 -z-10 h-full w-full">
                <div className="absolute top-0 left-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.2)_0,rgba(0,163,255,0.12)_50%,rgba(0,163,255,0)_100%)]"></div>
            </div>
        </>
    );
}