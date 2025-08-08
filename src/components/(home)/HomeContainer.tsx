import { useEffect, useState } from 'react';
import { ageInYears } from '@/lib/AgeInYears';
import { getFormattedTime } from '@/lib/Time';
import SocialLinksGrid from "@/components/(home)/SocialLinksGrid";
import TechStack from "@/components/(home)/TechStack";
import Projects from "@/components/(home)/Projects";
import TopArtists from "@/components/(home)/TopArtists";
import Link from 'next/link';

const HomeContainer: React.FC = () => {
    const [currentTime, setCurrentTime] = useState<string>(getFormattedTime());

    useEffect(() => {
        const intervalId = setInterval(() => setCurrentTime(getFormattedTime()), 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-3/5 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-zinc-100">Pranshu Patel</h1>
            <p className="text-sm text-zinc-400 mt-1 mb-4">(He/Him) • {ageInYears}y/o Developer, India • {currentTime}</p>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">Hey there! 👋🏻 I&apos;m Pranshu, a full-stack developer and pre-final year uni student based in India. Currently working on a few projects and pursuing B.Tech. in Information and Communication Technology from <a aria-label='Links do not have a discernible name' className="link" href="https://daiict.ac.in" target="_blank" rel="noopener noreferrer">Dhirubhai Ambani University</a>.</p>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">A technology nerd who likes to code and listen to music instead of focusing on studies. I attend my uni lectures to fulfill my attendance quota. Fun fact: I can write code faster than I can decide what to eat for lunch. Also, I once tried to fix a bug for 6 hours, only to realize it was a missing semicolon. True story!</p>
            <SocialLinksGrid />
            <h2 className="text-xl font-bold mt-6 mb-4 text-zinc-100">My Story</h2>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">I started coding in 2020 during the{" "}<a className="link" href="https://en.wikipedia.org/wiki/COVID-19" target="_blank" rel="noreferrer">Covid</a>{" "}pandemic. I began with C and moved to web development, working with HTML, CSS, JavaScript, React, and Node.js. I&apos;m currently exploring Next.js and TypeScript.</p>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">Inspired by{" "}<a className="link" target="_blank" href="https://github.com/SebLague" rel="noreferrer">Sebastian Lague</a>, I&apos;m also passionate about UI/UX design and music. I love to work on web development, and I&apos;m interested in web3, Cloud Computing, DevOps, and CyberSecurity.</p>
            <p className="text-zinc-300 text-sm leading-relaxed">I also enjoy contributing to{" "}<a className="link" href='https://github.com/pranshu05' target='_blank'>open-source projects</a>{" "}and writing{" "}<Link className='link' href='/posts'>technical blogs</Link>. In my free time, I like to click photos - check out my{" "}<Link className="link" href='/gallery'>photography gallery</Link>.</p>
            <h2 className="text-xl font-bold mt-6 mb-4 text-zinc-100">Tech Stack</h2>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">Below is a comprehensive list of technologies I use for development and programming, including languages, frameworks, IDEs, apps and various software.</p>
            <TechStack />
            <h2 className="text-xl font-bold mt-6 mb-4 text-zinc-100">My Work</h2>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">I have worked on various projects and have experience with web development, discord bot development, and UI/UX design. I have also worked on a few open-source projects and have contributed to some of them. Here are some of my featured projects.</p>
            <Projects />
            <h2 className="text-xl font-bold mt-6 mb-4 text-zinc-100">Technical Writing</h2>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">I enjoy writing about web development, programming concepts, and sharing my experiences. My blog covers topics ranging from React and Next.js to algorithms and development best practices.</p>
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-6 hover:border-zinc-700/50 transition-all duration-300 mb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-base font-semibold text-zinc-100 mb-2">Latest Blog Posts</h3>
                        <p className="text-sm text-zinc-400">Explore my technical articles and tutorials</p>
                    </div>
                    <Link href="/posts" className="link text-sm flex-shrink-0">Read all posts →</Link>
                </div>
            </div>
            <h2 className="text-xl font-bold mt-6 mb-4 text-zinc-100">Music</h2>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">I love listening to music while coding. Here are my top artists from Last.fm that have been filling my week with colors!</p>
            <TopArtists />
            <h2 className="text-xl font-bold mt-6 mb-4 text-zinc-100">Let&apos;s Connect</h2>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">I&apos;m always open to learning new technologies and love to work on new projects. If you have any project ideas or want to collaborate, feel free to reach out to me on{" "}<a className="link" href="https://twitter.com/pranshu_05" target="_blank" rel="noopener noreferrer">Twitter</a>{" "}[I may be delayed in responding at times].</p>
            <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-4">
                    <h3 className="text-base font-semibold text-zinc-100 mb-2">Open to Opportunities</h3>
                    <p className="text-sm text-zinc-400">Internships, freelance projects, and collaborations</p>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-zinc-100 mb-2">Interests</h3>
                    <p className="text-xs text-zinc-400">Web3, Cloud Computing, DevOps, CyberSecurity</p>
                </div>
            </div>
        </div>
    )
}

export default HomeContainer;