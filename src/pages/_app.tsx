import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="min-h-dvh w-dvw p-0 m-0 text-zinc-100 flex flex-col">
        <NavBar />
        <div className="flex-1">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
      <div className="fixed left-0 top-0 -z-10 h-dvh w-dvw">
        <div className="absolute top-0 left-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.2)_0,rgba(0,163,255,0.12)_50%,rgba(0,163,255,0)_100%)]"></div>
      </div>
    </>
  )
}
