"use client";

import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import type { Metadata } from "next";
import { ageInYears } from '@/lib/AgeInYears';
import { useEffect, useState } from 'react';
import { getFormattedTime } from '@/lib/Time';
import HomeImageGrid from '@/components/HomeImageGrid';
import Link from 'next/link';

const socialLinks = [
    { href: 'https://github.com/pranshu05', icon: <FaGithub />, text: 'GitHub' },
    { href: 'https://linkedin.com/in/pranshu05', icon: <FaLinkedin />, text: 'LinkedIn' },
    { href: 'https://twitter.com/pranshu_05', icon: <FaTwitter />, text: 'Twitter' },
    { href: 'https://instagram.com/pranshu.05', icon: <FaInstagram />, text: 'Instagram' },
];

export const metadata: Metadata = {
    title: 'Pranshu05',
    description: 'Portfolio website of Pranshu05',
};

const Home: React.FC = () => {
    const [currentTime, setCurrentTime] = useState<string>(getFormattedTime());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(getFormattedTime());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
            <div className="pb-8">
                <div className="flex items-baseline">
                    <h1 className="text-3xl font-medium">Pranshu Patel</h1>
                    <p className="text-sm px-1 text-zinc-400">(He/Him)</p>
                </div>
                <p className="text-zinc-400">{ageInYears}y/o Developer, India • {currentTime}</p>
            </div>
            <p className="text-zinc-400">
                Hey there! 👋🏻 I&apos;m Pranshu, a fullstack developer and college fresher based in India. Currently working on a few projects and pursuing B.Tech. in ICT from <a className="link" href="https://daiict.ac.in" target="_blank" rel="noopener noreferrer">DA-IICT</a>.
            </p>
            <div className="my-4 grid gap-2 md:gap-4 grid-cols-2 sm:grid-cols-4 mx-auto">
                {socialLinks.map((item, index) => (
                    <div key={index} className="outline outline-1 outline-zinc-400 rounded-lg p-2">
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="link flex gap-2 items-center justify-center"> {item.icon} {item.text}</a>
                    </div>
                ))}
            </div>
            <p className="text-zinc-400">
                In my free time, I like to click photos, from which some of them are showcased below. Check out my <Link className='link' href='/gallery'>gallery</Link> for more.
            </p>
            <HomeImageGrid />
            <p className="text-zinc-400">
                I love to work on web development, and I&apos;m currently learning about cloud computing, DevOps, and cybersecurity. I also enjoy contributing to <a className='link' href='https://github.com/pranshu05' target='_blank'>open-source projects </a>and writing <Link className='link' href='/posts'>technical blogs</Link>.
            </p>
        </div>
    );
};

export default Home;