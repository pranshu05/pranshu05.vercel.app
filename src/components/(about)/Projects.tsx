import { FaGlobe } from "react-icons/fa";

const { FaGithub } = require('react-icons/fa');

const projects = [
    {
        title: 'AcadVault2.0',
        description: 'A dynamic and collaborative open-source repository of Academic Resources for DA-IICT.',
        techStack: ['NextJS', 'Tailwind CSS', 'Vercel', 'MongoDB'],
        github: 'https://github.com/AcadVault/AcadVault2.0',
        website: 'https://acadvault.vercel.app',
    },
    {
        title: 'CPPVault',
        description: 'A dynamic and collaborative open-source repository of C++ and Data Structure documentations.',
        techStack: ['NextJS', 'Tailwind CSS', 'Vercel', 'MongoDB'],
        github: 'https://github.com/pranshu05/CPPVault',
        website: 'https://cppvault.vercel.app',
    },
    {
        title: 'Protify',
        description: 'A simple and elegant spotify activity tracker made with react.',
        techStack: ['ReactJS', 'Spotify API'],
        github: 'https://github.com/pranshu05/protify',
        website: 'https://protify.vercel.app',
    },
    {
        title: 'Game of life simulation',
        description: 'A simple game of life simulation using React.',
        techStack: ['ReactJS'],
        website: 'https://conway-alpha.vercel.app',
    },
    {
        title: 'Elpha',
        description: 'An open-source verified multi-purpose discord bot with over 150k users.',
        techStack: ['NodeJS', 'MongoDB', 'Discord.js'],
        github: 'https://github.com/pranshu05/Elpha',
        website: 'https://elphabot.github.io'
    },
    {
        title: 'Anti Ghost Ping',
        description: 'Powerful and open-source ghost ping detection bot!',
        techStack: ['NodeJS', 'Discord.js'],
        github: 'https://github.com/pranshu05/AGP',
    },
]

const Projects: React.FC = () => (
    <div className="w-full my-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(({ title, description, techStack, github, website }, index) => (
            <div className="bg-transparent outline outline-[2px] outline-zinc-700 rounded-lg w-full p-4 flex flex-col gap-2" key={index}>
                <div className="text-xl font-bold">{title}</div>
                <div>{description}</div>
                <div className="flex gap-2">{techStack.map((tech, index) => (<div key={index} className="rounded-lg bg-zinc-900 p-[6px] text-sm">{tech}</div>))}</div>
                <div className="flex gap-2 text-xs">
                    {github && <a href={github} target="_blank" className="text-xl my-1"><FaGithub /></a>}
                    {website && <a href={website} target="_blank" className="text-xl my-1"><FaGlobe /></a>}
                </div>
            </div>
        ))}
    </div>
)

export default Projects;