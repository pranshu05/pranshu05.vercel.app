import { ageInYears } from '../lib/AgeInYears';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Pranshu05',
  description: 'Portfolio website of Pranshu05',
}

const Home: React.FC = () => (
  <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
    <div className="pb-8">
      <div className="flex items-baseline">
        <h1 className="text-3xl font-medium">Pranshu Patel</h1>
        <p className="text-sm px-1 text-zinc-400">(He/Him)</p>
      </div>
      <p className="text-zinc-400">{ageInYears}y/o Developer, India</p>
    </div>
    <p className="text-zinc-400">
      Hey there! 👋 I&apos;m Pranshu, a fullstack developer and college fresher based in India. Currently working on a few projects and pursuing B.Tech. in ICT from <a className="link" href="https://daiict.ac.in" target="_blank" rel="noopener noreferrer">DA-IICT</a>.
    </p>
    <div className="my-4 grid gap-2 md:gap-4 grid-cols-2 sm:grid-cols-4 mx-auto">
      {[
        { href: 'https://github.com/pranshu05', icon: <FaGithub className='mr-2' />, text: 'GitHub' },
        { href: 'https://linkedin.com/in/pranshu05', icon: <FaLinkedin className='mr-2' />, text: 'LinkedIn' },
        { href: 'https://twitter.com/pranshu_05', icon: <FaTwitter className='mr-2' />, text: 'Twitter' },
        { href: 'https://instagram.com/pranshu.05', icon: <FaInstagram className='mr-2' />, text: 'Instagram' },
      ].map((item, index) => (
        <div key={index} className="outline outline-1 outline-zinc-400 rounded-lg p-2">
          <a href={item.href} target="_blank" rel="noopener noreferrer" className="link flex items-center justify-center">
            {item.icon} {item.text}
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default Home;