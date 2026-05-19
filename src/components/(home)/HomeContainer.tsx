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
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">Hey there! It&apos;s me, Pranshu! I skew toward backends but still love a sharp frontend when the product calls for it. I&apos;m finishing my B.Tech in Information and Communication Technology at{" "} <a aria-label="Dhirubhai Ambani University" className="link" href="https://daiict.ac.in" target="_blank" rel="noopener noreferrer">Dhirubhai Ambani University</a>{" "}. Recently I&apos;ve been in Kotlin and Spring Boot land at Fleetway, wiring up logistics APIs; before that I interned at Roommit on Django services and a Next.js client for roommate matching.</p>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">I started tinkering in 2020 and drifted from C into the web, then into APIs and databases. Most days that means TypeScript, Kotlin, or Python talking to PostgreSQL or Redis, but I&apos;ll happily stay up late on React or Next.js when the UI needs polish. Off the clock I write{" "}<Link className="link" href="/posts">occasional posts</Link>, ship bits of{" "}<a className="link" href="https://github.com/pranshu05" target="_blank" rel="noopener noreferrer">open source</a>, and keep a small{" "}<Link className="link" href="/gallery">photo gallery</Link></p>
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
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">I keep a blog for work that does not fit in a README: walkthroughs of things I built or broke, performance and debugging stories where the fix was embarrassing in hindsight, and longer notes on React, Next.js, APIs, databases, and whatever toolchain I am wrestling with that month. Some posts are tutorials, some are experiments or visuals, and some are basically rubber ducks with syntax highlighting, mostly so future me can grep my own mistakes.{" "}<Link href="/posts" className="link">Read the posts</Link>{" "}when you want the full version.</p>
            {/* <h2 className="text-xl font-bold mt-6 mb-1 text-zinc-100">Music</h2>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">Top artists from my Last.fm week while coding.</p>
            <TopArtists /> */}
        </div>
    )
}

export default HomeContainer;