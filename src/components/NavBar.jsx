import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router';

export const NavBar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <header className='w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto py-20'>
            <div className='flex items-center'>
                <nav className='flex justify-between rounded-3xl px-1 py-2 w-full'>
                    <div>
                        <Link className={router.pathname === "/" ? "text-white mx-2 py-1 px-2 rounded-full bg-black bg-opacity-50" : "text-white mx-2 py-1 px-2 rounded-full hover:bg-black hover:bg-opacity-40"} href="/" onClick={handleLinkClick}>-</Link>
                    </div>
                    <div className='flex gap-2'>
                        <Link className={router.pathname === "/about" ? "text-white mr-2 py-1 px-2 rounded-full bg-black bg-opacity-50" : "text-white mr-2 py-1 px-2 rounded-full hover:bg-black hover:bg-opacity-40"} href="/about" onClick={handleLinkClick}>about</Link>
                        <Link className={router.pathname === "/posts" ? "text-white mr-2 py-1 px-2 rounded-full bg-black bg-opacity-50" : "text-white mr-2 py-1 px-2 rounded-full hover:bg-black hover:bg-opacity-40"} href="/posts" onClick={handleLinkClick}>blog</Link>
                        <div className='relative inline-block'>
                            <div>
                                <button type='button' className='inline-flex w-full justify-center gap-x-1.5 text-white py-1 px-2 rounded-full hover:bg-black hover:bg-opacity-40' aria-expanded="true" aria-haspopup="true" onClick={() => setIsOpen(!isOpen)}>more
                                    <svg className="-mr-1 h-6 w-6 pt-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            {isOpen && (
                                <div className="absolute right-0 z-10 mt-2 w-fit origin-top-right rounded-md shadow-lg bg-black bg-opacity-20 border border-zinc-400 text-white" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                    <div className="p-2" role="none">
                                        <Link href="/music" className={router.pathname === "/music" ? "block text-white my-1 px-2 rounded-full py-1 bg-black bg-opacity-50" : "block text-white my-1 px-2 rounded-full py-1 hover:bg-black hover:bg-opacity-40"} onClick={handleLinkClick} role="menuitem" tabIndex="-1" id="menu-item-0">music</Link>
                                        <Link href="/gallery" className={router.pathname === "/gallery" ? "block text-white my-1 px-2 rounded-full py-1 bg-black bg-opacity-50" : "block text-white my-1 px-2 rounded-full py-1 hover:bg-black hover:bg-opacity-40"} onClick={handleLinkClick} role="menuitem" tabIndex="-1" id="menu-item-1">gallery</Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};
