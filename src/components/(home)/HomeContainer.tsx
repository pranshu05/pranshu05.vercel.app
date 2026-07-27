import { useEffect, useState } from 'react';
import { ageInYears } from '@/lib/AgeInYears';
import { getFormattedTime } from '@/lib/Time';
import TechStack from "@/components/(home)/TechStack";
import Experience from "@/components/(home)/Experience";
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
            <p className="text-sm text-zinc-400 mt-1 mb-4">(He/Him) • {ageInYears}y/o • {currentTime}</p>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">Hey, I&apos;m Pranshu. I&apos;m currently pursuing my B.Tech in ICT at{" "}<a aria-label="Dhirubhai Ambani University" className="link" href="https://daiict.ac.in" target="_blank" rel="noopener noreferrer">Dhirubhai Ambani University</a>, and I mostly live on the backend side of things, though I&apos;ll jump into a frontend when something actually needs shipping. Just wrapped an internship at Fleetway building logistics APIs in Kotlin and Spring Boot; before that I was at Roommit doing Django services and a Next.js app for roommate matching.</p>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">I&apos;ve been messing around with code since 2020. Started with C, somehow ended up in web stuff, and now I spend most of my time in TypeScript, Kotlin, or Python talking to Postgres and Redis. When I&apos;m not doing that, I write{" "}<Link className="link" href="/posts">some odd posts</Link>, push{" "}<a className="link" href="https://github.com/pranshu05" target="_blank" rel="noopener noreferrer">open source</a> when I can, and dump photos in my{" "}<Link className="link" href="/gallery">gallery</Link>.</p>
            <h2 className="text-xl font-bold mt-6 mb-1 text-zinc-100">Experience</h2>
            <p className="text-zinc-500 text-sm mb-0">Work and campus leadership.</p>
            <Experience />
            <h2 className="text-xl font-bold mt-6 mb-1 text-zinc-100">Projects</h2>
            <p className="text-zinc-500 text-sm mb-0">Tools, apps, and libraries I have shipped or maintain.</p>
            <Projects />
            <h2 className="text-xl font-bold mt-6 mb-1 text-zinc-100">Tech stack</h2>
            <p className="text-zinc-500 text-sm mb-0">Languages, frameworks, and tools I use often.</p>
            <TechStack />
            <h2 className="text-xl font-bold mt-6 mb-1 text-zinc-100">Writing</h2>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">Sometimes I build or break something interesting enough to write about, so I keep a{" "}<Link href="/posts" className="link">blog</Link>. It&apos;s mostly stuff that doesn&apos;t belong in a README — debugging rabbit holes, performance wins I stumbled into, walkthroughs of projects, and notes on whatever I&apos;m learning that week. Half of it is for other people, half is so I can look it up later when I inevitably forget how I fixed something.</p>
            {/* <h2 className="text-xl font-bold mt-6 mb-1 text-zinc-100">Music</h2>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">Top artists from my Last.fm week while coding.</p>
            <TopArtists /> */}
        </div>
    )
}

export default HomeContainer;