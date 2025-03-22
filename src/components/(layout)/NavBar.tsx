import Link from "next/link"
import { usePathname } from "next/navigation"

const NavBar: React.FC = () => {
    const path = usePathname()
    const routes = ["/about", "/posts", "/gallery"]

    return (
        <header className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-3/5 max-w-3xl mx-auto py-8">
            <nav className="w-full flex items-center justify-between">
                <Link href="/" passHref>
                    <p className={`transition-colorstext-sm ${path === '/' ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-300"} transition-colors`}>/</p>
                </Link>
                <div className="flex gap-4 items-center justify-center">
                    {routes.map((route) => (
                        <Link key={route} href={route} passHref>
                            <p className={`transition-colorstext-sm ${path === route ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-300"} transition-colors`}>{route === "/" ? "/" : route.substring(1)}</p>
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    )
}

export default NavBar