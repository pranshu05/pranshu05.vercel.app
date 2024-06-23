import { useEffect, useState } from 'react';
import { ageInYears } from '@/lib/AgeInYears';
import { getFormattedTime } from '@/lib/Time';
import HomeImageGrid from '@/components/(home)/ImageGrid';
import SocialLinksGrid from "@/components/(home)/SocialLinksGrid";
import Link from 'next/link';

const HomeContainer: React.FC = () => {
    const [currentTime, setCurrentTime] = useState<string>(getFormattedTime());

    useEffect(() => {
        const intervalId = setInterval(() => setCurrentTime(getFormattedTime()), 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
            <div className="pb-8">
                <div className="flex items-baseline">
                    <h1 className="text-3xl font-medium text-zinc-100">Pranshu Patel</h1>
                    <p className="text-sm px-1 text-zinc-400">(He/Him)</p>
                </div>
                <p className="text-zinc-400">{ageInYears}y/o Developer, India • {currentTime}</p>
            </div>
            <p>Hey there! 👋🏻 I&apos;m Pranshu, a full-stack developer and uni sophomore based in India. Currently working on a few projects and pursuing B.Tech. in ICT from <a className="link" href="https://daiict.ac.in" target="_blank" rel="noopener noreferrer">DA-IICT</a>.</p>
            <SocialLinksGrid />
            <p>In my free time, I like to click photos, some of them are showcased below. Check out my <Link className='link' href='/gallery'>gallery</Link> for more. (Checkout my <a href='https://unsplash.com/@pranshu05' target='_blank' className='link'>Unsplash profile</a>.)</p>
            <HomeImageGrid />
            <p>I love to work on web development, and I&apos;m insterested in web3, Cloud Computing, DevOps, and CyberSecurity. I also enjoy contributing to <a className='link' href='https://github.com/pranshu05' target='_blank'>open-source projects</a> and writing <Link className='link' href='/posts'>technical blogs</Link>.</p>
        </div>
    )
}

export default HomeContainer;