import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pranshu05",
  description: "Pranshu05's personal website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <div className="absolute top-0 left-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.2)_0,rgba(0,163,255,0.12)_50%,rgba(0,163,255,0)_100%)]"></div>
      <body className={[inter.className, "bg-neutral-950 text-zinc-100"]}>
        {children}
      </body>
    </html>
  );
}
