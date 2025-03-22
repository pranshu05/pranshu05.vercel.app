import { Globe, Github } from "lucide-react";

const projects = [
    {
        title: 'AcadVault2.0',
        description: 'A dynamic and collaborative open-source repository of Academic Resources for DA-IICT.',
        techStack: ['Next.js', 'Tailwind CSS', 'Vercel', 'MongoDB'],
        github: 'https://github.com/AcadVault/AcadVault2.0',
        website: 'https://acadvault.vercel.app',
    },
    {
        title: 'TuneStats',
        description: 'A simple and elegant spotify activity tracker made with react.',
        techStack: ['Next.js', 'Spotify API'],
        github: 'https://github.com/pranshu05/tunestats',
    },
    {
        title: 'CPPVault',
        description: 'A dynamic and collaborative open-source repository of C++ and Data Structure documentations.',
        techStack: ['Next.js', 'Tailwind CSS', 'Vercel', 'MongoDB'],
        github: 'https://github.com/pranshu05/CPPVault',
        website: 'https://cppvault.vercel.app',
    },
    {
        title: 'Elpha',
        description: 'An open-source verified multi-purpose discord bot with over 150k users.',
        techStack: ['Node.js', 'MongoDB', 'Discord.js'],
        github: 'https://github.com/pranshu05/Elpha',
        website: 'https://elphabot.github.io'
    },
]

const Projects: React.FC = () => (
    <div className="w-full mt-4 mb-8 space-y-4">
        {projects.map(({ title, description, techStack, github, website }, index) => (
            <div key={index} className="border-t border-zinc-800 pt-4">
                <h3 className="text-base font-medium mb-1">{title}</h3>
                <p className="text-sm mb-2">{description}</p>
                <div className="flex flex-wrap gap-2 mb-3">{techStack.map((t) => (<span key={t} className="text-xs text-zinc-400">{t}</span>))}</div>
                <div className="flex gap-3">
                    {github && (
                        <a href={github} className="text-zinc-400 hover:text-zinc-100 transition-colors"><Github className="w-4 h-4" /></a>
                    )}
                    {website && (
                        <a href={website} className="text-zinc-400 hover:text-zinc-100 transition-colors"><Globe className="w-4 h-4" /></a>
                    )}
                </div>
            </div>
        ))}
    </div>
)

export default Projects;