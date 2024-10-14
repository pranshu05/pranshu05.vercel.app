import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar: React.FC = () => {
    const path = usePathname();
    const routes = ['/', '/about', '/posts', '/gallery'];

    return (
        <header className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto py-10">
            <nav className="w-full">
                <div className="flex gap-4">
                    {routes.map((route) => (
                        <Link key={route} href={route} passHref>
                            <p className={`text-zinc-100 py-1 px-2 rounded-lg ${path === route ? 'bg-zinc-600 bg-opacity-40' : 'hover:bg-zinc-700 hover:bg-opacity-30'}`}>{route === '/' ? '/' : route.substring(1)}</p>
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
};

export default NavBar;