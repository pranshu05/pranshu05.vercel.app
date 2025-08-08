import { Globe, Github } from 'lucide-react';
import Card from "@/components/UI/Card";
import Badge from "@/components/UI/Badge";

const projects = [
    {
        title: 'next-api-analyzer',
        description: 'A tool to analyze and visualize Next.js API routes, providing insights into performance and usage.',
        techStack: ['TypeScript'],
        github: 'https://github.com/pranshu05/next-api-analyzer',
        website: 'https://www.npmjs.com/package/next-api-analyzer',
    },
    {
        title: 'MusicZodiac',
        description: 'an astrology-themed music web app using Next.js, Last.fm API, and AI to generate personalized listening charts.',
        techStack: ['Next.js', 'Last.fm API', 'OpenAI API'],
        github: 'https://github.com/pranshu05/musiczodiac',
        website: 'https://music-zodiac.vercel.app',
    },
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
            <Card key={index} hover className="group p-4">
                <div className="flex flex-col space-y-3">
                    <div className="flex items-start justify-between">
                        <h3 className="text-base font-semibold text-zinc-100 group-hover:text-white transition-colors">{title}</h3>
                        <div className="flex gap-2 ml-4">
                            {github && (<a href={github} className="text-zinc-400 hover:text-zinc-100 transition-colors p-1" aria-label={`View ${title} on GitHub`} target="_blank" rel="noopener noreferrer"><Github className="w-4 h-4" /></a>)}
                            {website && (<a href={website} className="text-zinc-400 hover:text-zinc-100 transition-colors p-1" aria-label={`Visit ${title} website`} target="_blank" rel="noopener noreferrer"><Globe className="w-4 h-4" /></a>)}
                        </div>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed">{description}</p>
                    <div className="flex flex-wrap gap-2">{techStack.map((tech) => (<Badge key={tech} variant="secondary" size="sm">{tech}</Badge>))}</div>
                </div>
            </Card>
        ))}
    </div>
)

export default Projects;