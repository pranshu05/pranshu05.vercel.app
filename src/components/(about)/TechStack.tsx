import { FaHtml5, FaCss3, FaJsSquare, FaReact, FaNodeJs, FaGithub, FaDiscord } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMdx, SiVercel, SiVisualstudiocode, SiVisualstudio } from "react-icons/si";

const techs = [
    { icon: <FaHtml5 key="html" />, href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { icon: <FaCss3 key="css" />, href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    { icon: <FaJsSquare key="js" />, href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { icon: <FaReact key="react" />, href: 'https://reactjs.org/' },
    { icon: <SiNextdotjs key="next" />, href: 'https://nextjs.org/' },
    { icon: <FaNodeJs key="node" />, href: 'https://nodejs.org/' },
    { icon: <SiTailwindcss key="tailwind" />, href: 'https://tailwindcss.com/' },
    { icon: <SiMdx key="mdx" />, href: 'https://mdxjs.com/' },
    { icon: <FaGithub key="github" />, href: 'https://github.com/' },
    { icon: <SiVercel key="vercel" />, href: 'https://vercel.com/' },
    { icon: <SiVisualstudiocode key="vscode" />, href: 'https://code.visualstudio.com/' },
    { icon: <SiVisualstudio key="vstudio" />, href: 'https://visualstudio.microsoft.com/' },
    { icon: <FaDiscord key="discord" />, href: 'https://discord.com/' },
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