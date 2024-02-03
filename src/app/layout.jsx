import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pranshu05",
  description: "Pranshu05's personal website",
};

export default function RootLayout({ children }) {
  return (
    <html className="bg-neutral-950 text-slate-50" lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
