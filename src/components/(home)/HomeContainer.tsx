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
        <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-3/5 max-w-3xl mx-auto">
            <div className="mb-10">
                <h1 className="text-2xl font-bold text-zinc-100">Pranshu Patel</h1>
                <p className="text-sm text-zinc-400 mt-1">(He/Him) • {ageInYears}y/o Developer, India • {currentTime}</p>
            </div>
            <p className="text-zinc-300 text-sm leading-relaxed mb-6">Hey there! 👋🏻 I&apos;m Pranshu, a full-stack developer and uni sophomore based in India. Currently working on a few projects and pursuing B.Tech. in Information and Communication Technology from <a className="link" href="https://daiict.ac.in" target="_blank" rel="noopener noreferrer">Dhirubhai Ambani Institute of Information and Communication Technology</a>.</p>
            <SocialLinksGrid />
            <p className="text-zinc-300 text-sm leading-relaxed mt-8 mb-4">In my free time, I like to click photos, some of them are showcased below. Check out my <Link className="link" href='/gallery'>gallery</Link> for more. (Checkout my <a href='https://unsplash.com/@pranshu05' target='_blank' className='link'>Unsplash profile</a>.)</p>
            <HomeImageGrid />
            <p className="text-zinc-300 text-sm leading-relaxed mt-8">I love to work on web development, and I&apos;m insterested in web3, Cloud Computing, DevOps, and CyberSecurity. I also enjoy contributing to <a className="link" href='https://github.com/pranshu05' target='_blank'>open-source projects</a> and writing <Link className='link text-zinc-100 hover:text-zinc-400 transition-colors' href='/posts'>technical blogs</Link>.</p>
        </div>
    )
}

export default HomeContainer;