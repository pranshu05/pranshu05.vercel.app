import { FaHtml5, FaCss3, FaJsSquare, FaReact, FaNodeJs, FaGithub, FaDiscord, FaGit } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMdx, SiVercel, SiVisualstudiocode, SiMongodb, SiTypescript, SiFirebase, SiVim, SiObsidian, SiPython, SiPostgresql, SiRedis, SiDjango, SiExpress, SiCplusplus, SiPostman, SiRailway, SiKotlin, SiSpringboot, SiDocker } from 'react-icons/si';

const techs = [
    { icon: <FaHtml5 />, href: 'https://developer.mozilla.org/en-US/docs/Web/HTML', name: 'HTML' },
    { icon: <FaCss3 />, href: 'https://developer.mozilla.org/en-US/docs/Web/CSS', name: 'CSS' },
    { icon: <FaJsSquare />, href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', name: 'JavaScript' },
    { icon: <SiTypescript />, href: 'https://www.typescriptlang.org/', name: 'TypeScript' },
    { icon: <SiCplusplus />, href: 'https://isocpp.org/', name: 'C++' },
    { icon: <SiPython />, href: 'https://www.python.org/', name: 'Python' },
    { icon: <SiKotlin />, href: 'https://kotlinlang.org/', name: 'Kotlin' },
    { icon: <FaReact />, href: 'https://reactjs.org/', name: 'ReactJS' },
    { icon: <SiNextdotjs />, href: 'https://nextjs.org/', name: 'NextJS' },
    { icon: <FaNodeJs />, href: 'https://nodejs.org/', name: 'NodeJS' },
    { icon: <SiExpress />, href: 'https://expressjs.com/', name: 'Express' },
    { icon: <SiSpringboot />, href: 'https://spring.io/projects/spring-boot', name: 'Spring Boot' },
    { icon: <SiDjango />, href: 'https://www.djangoproject.com/', name: 'Django' },
    { icon: <SiPostgresql />, href: 'https://www.postgresql.org/', name: 'PostgreSQL' },
    { icon: <SiRedis />, href: 'https://redis.io/', name: 'Redis' },
    { icon: <SiTailwindcss />, href: 'https://tailwindcss.com/', name: 'Tailwind' },
    { icon: <SiMdx />, href: 'https://mdxjs.com/', name: 'MDX' },
    { icon: <SiMongodb />, href: 'https://www.mongodb.com/', name: 'MongoDB' },
    { icon: <SiFirebase />, href: 'https://firebase.google.com/', name: 'Firebase' },
    { icon: <SiDocker />, href: 'https://www.docker.com/', name: 'Docker' },
    { icon: <SiPostman />, href: 'https://www.postman.com/', name: 'Postman' },
    { icon: <SiRailway />, href: 'https://railway.app/', name: 'Railway' },
    { icon: <FaGit />, href: 'https://git-scm.com/', name: 'Git' },
    { icon: <FaGithub />, href: 'https://github.com/', name: 'GitHub' },
    { icon: <SiVercel />, href: 'https://vercel.com/', name: 'Vercel' },
    { icon: <SiVisualstudiocode />, href: 'https://code.visualstudio.com/', name: 'VSCode' },
    { icon: <SiVim />, href: 'https://neovim.io', name: 'NeoVim' },
    { icon: <SiObsidian />, href: 'https://obsidian.md', name: 'Obsidian' },
    { icon: <FaDiscord />, href: 'https://discord.com/', name: 'Discord' }
];

const TechStack: React.FC = () => (
    <div className="flex gap-1 md:gap-2 flex-wrap mt-3 mb-0">
        {techs.map(({ icon, href, name }, index) => (
            <a aria-label={`${name} documentation`} key={index} className="text-sm flex items-center justify-center p-2 gap-2 bg-zinc-900" href={href} target="_blank" rel="noopener noreferrer">{icon}{name}</a>
        ))}
    </div>
);

export default TechStack;