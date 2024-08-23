import { FaHtml5, FaCss3, FaJsSquare, FaReact, FaNodeJs, FaGithub, FaDiscord, FaGit } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMdx, SiVercel, SiVisualstudiocode, SiVisualstudio, SiMongodb, SiTypescript, SiFirebase, SiVim, SiObsidian } from 'react-icons/si';

const techs = [
    { icon: <FaHtml5 />, href: 'https://developer.mozilla.org/en-US/docs/Web/HTML', name: 'HTML' },
    { icon: <FaCss3 />, href: 'https://developer.mozilla.org/en-US/docs/Web/CSS', name: 'CSS' },
    { icon: <FaJsSquare />, href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', name: 'JavaScript' },
    { icon: <SiTypescript />, href: 'https://www.typescriptlang.org/', name: 'TypeScript' },
    { icon: <FaReact />, href: 'https://reactjs.org/', name: 'ReactJS' },
    { icon: <SiNextdotjs />, href: 'https://nextjs.org/', name: 'NextJS' },
    { icon: <FaNodeJs />, href: 'https://nodejs.org/', name: 'NodeJS' },
    { icon: <SiTailwindcss />, href: 'https://tailwindcss.com/', name: 'Tailwind' },
    { icon: <SiMdx />, href: 'https://mdxjs.com/', name: 'MDX' },
    { icon: <SiMongodb />, href: 'https://www.mongodb.com/', name: 'MongoDB' },
    { icon: <SiFirebase />, href: 'https://firebase.google.com/', name: 'Firebase' },
    { icon: <FaGit />, href: 'https://git-scm.com/', name: 'Git' },
    { icon: <FaGithub />, href: 'https://github.com/', name: 'GitHub' },
    { icon: <SiVercel />, href: 'https://vercel.com/', name: 'Vercel' },
    { icon: <SiVisualstudiocode />, href: 'https://code.visualstudio.com/', name: 'VSCode' },
    { icon: <SiVisualstudio />, href: 'https://visualstudio.microsoft.com/', name: 'VisualStudio' },
    { icon: <SiVim />, href: 'https://neovim.io', name: 'NeoVim' },
    { icon: <SiObsidian />, href: 'https://obsidian.md', name: 'Obsidian' },
    { icon: <FaDiscord />, href: 'https://discord.com/', name: 'Discord' }
];

const TechStack: React.FC = () => (
    <div className="flex my-8 gap-2 md:gap-3 flex-wrap">
        {techs.map(({ icon, href, name }, index) => (
            <a key={index} className="flex items-center justify-center p-2 gap-2 md:gap-3 bg-transparent outline outline-[2px] outline-zinc-700 rounded-lg" href={href} target="_blank" rel="noopener noreferrer">{icon}{name}</a>
        ))}
    </div>
);

export default TechStack;