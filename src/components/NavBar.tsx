import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { RiSunLine, RiMoonLine } from 'react-icons/ri';

const NavBar: React.FC = () => {
    const path = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = () => setIsOpen(false);

    return (
        <header className='w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto py-10'>
            <nav className='flex justify-between rounded-3xl px-1 py-2 w-full'>
                <div className='flex gap-4'>
                    {['/', '/about', '/posts'].map((route) => (
                        <Link key={route} href={route} passHref>
                            <p className={`text-white py-1 px-2 rounded-full ${path === route ? 'bg-black bg-opacity-50' : 'hover:bg-black hover:bg-opacity-40'}`} onClick={handleLinkClick}> {route === '/' ? '/' : route.substring(1)} </p>
                        </Link>
                    ))}
                    <div className='relative inline-block'>
                        <button type='button' className='inline-flex w-full justify-center gap-x-1.5 text-white py-1 px-2 rounded-full hover:bg-black hover:bg-opacity-40 transition' onClick={() => setIsOpen(!isOpen)} >
                            more
                            <svg className='-mr-1 h-6 w-6 pt-1 text-gray-400' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'> <path fillRule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z' clipRule='evenodd' /> </svg>
                        </button>
                        <div className={`absolute ${isOpen ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-0'} transition-all duration-300 ease-in-out delay-150 right-0 z-10 mt-2 w-fit origin-top-right rounded-md shadow-lg bg-zinc-950 border border-zinc-400 text-white`} role='menu' aria-orientation='vertical' aria-labelledby='menu-button' tabIndex={-1}>
                            <div className='p-2' role='none'>
                                {['/music', '/gallery'].map((route, index) => (
                                    <Link key={index} href={route} passHref>
                                        <p className={`block text-white my-1 px-2 rounded-full py-1 ${path === route ? 'bg-zinc-300 bg-opacity-50' : 'hover:bg-zinc-400 hover:bg-opacity-40'}`} onClick={handleLinkClick} role='menuitem' tabIndex={-1}>
                                            {route.substring(1)}
                                        </p>
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