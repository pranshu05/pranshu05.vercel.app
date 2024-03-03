import { FaHtml5, FaCss3, FaJsSquare, FaReact, FaNodeJs, FaGithub, FaDiscord, FaGit } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMdx, SiVercel, SiVisualstudiocode, SiVisualstudio, SiMongodb, SiTypescript, SiFirebase } from 'react-icons/si';

const techs = [
    { icon: <FaHtml5 />, href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { icon: <FaCss3 />, href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    { icon: <FaJsSquare />, href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { icon: <SiTypescript />, href: 'https://www.typescriptlang.org/' },
    { icon: <FaReact />, href: 'https://reactjs.org/' },
    { icon: <SiNextdotjs />, href: 'https://nextjs.org/' },
    { icon: <FaNodeJs />, href: 'https://nodejs.org/' },
    { icon: <SiTailwindcss />, href: 'https://tailwindcss.com/' },
    { icon: <SiMdx />, href: 'https://mdxjs.com/' },
    { icon: <SiMongodb />, href: 'https://www.mongodb.com/' },
    { icon: <SiFirebase />, href: 'https://firebase.google.com/' },
    { icon: <FaGit />, href: 'https://git-scm.com/' },
    { icon: <FaGithub />, href: 'https://github.com/' },
    { icon: <SiVercel />, href: 'https://vercel.com/' },
    { icon: <SiVisualstudiocode />, href: 'https://code.visualstudio.com/' },
    { icon: <SiVisualstudio />, href: 'https://visualstudio.microsoft.com/' },
    { icon: <FaDiscord />, href: 'https://discord.com/' },
];

const TechStack: React.FC = () => (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 my-8 text-4xl md:text-5xl gap-4 md:gap-6">
        {techs.map(({ icon, href }, index) => (
            <div key={index} className="flex items-center justify-center">
                <a className="link" href={href} target="_blank" rel="noopener noreferrer">{icon}</a>
            </div>
        ))}
    </div>
);

export default TechStack;