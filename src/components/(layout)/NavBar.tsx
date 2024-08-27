import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const NavBar: React.FC = () => {
    const path = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = () => setIsOpen(false);

    const routes = ['/', '/about', '/posts'];
    const menuRoutes = ['/gallery', '/guestbook'];

    return (
        <header className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto py-10">
            <nav className="w-full">
                <div className="flex gap-4">
                    {routes.map((route) => (
                        <Link key={route} href={route} passHref>
                            <p className={`text-zinc-100 py-1 px-2 rounded-lg ${path === route ? 'bg-zinc-600 bg-opacity-40' : 'hover:bg-zinc-700 hover:bg-opacity-30'}`} onClick={handleLinkClick}>{route === '/' ? '/' : route.substring(1)}</p>
                        </Link>
                    ))}
                    <div className="relative inline-block">
                        <button type="button" className={`inline-flex w-full justify-center gap-x-1.5 text-zinc-100 py-1 px-2 rounded-lg hover:bg-zinc-700 hover:bg-opacity-30 transition`} onClick={() => setIsOpen(!isOpen)}>more
                            <svg className="-mr-1 h-6 w-6 pt-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <div className={`absolute ${isOpen ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-0'} transition-all duration-300 ease-in-out delay-150 left-0 z-10 mt-2 w-fit origin-top-right rounded-lg shadow-lg bg-zinc-900 text-zinc-100`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                            <div className="p-2" role="none">
                                {menuRoutes.map((route) => (
                                    <Link key={route} href={route} passHref>
                                        <p className={`block w-fit mb-2 text-zinc-100 py-1 px-2 rounded-lg ${path === route ? 'bg-zinc-600 bg-opacity-40' : 'hover:bg-zinc-700 hover:bg-opacity-30'}`} onClick={handleLinkClick} role="menuitem" tabIndex={-1}>{route.substring(1)}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;