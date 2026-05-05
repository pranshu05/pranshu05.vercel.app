import { Globe } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/data/projects";

const Projects: React.FC = () => (
    <div className="w-full mt-3 mb-0 flex flex-col divide-y divide-zinc-800">
        {projects.map(({ title, blurb, stack, github, website }) => (
            <article key={title} className="py-5 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-4">
                    <h3 className="text-sm font-medium text-zinc-100">{title}</h3>
                    <div className="flex shrink-0 gap-2">
                        {github && (<a href={github}className="text-zinc-500 hover:text-zinc-300 transition-colors p-0.5"aria-label={`${title} on GitHub`}target="_blank"rel="noopener noreferrer"><FaGithub className="w-4 h-4" /></a>)}
                        {website && (<a href={website} className="text-zinc-500 hover:text-zinc-300 transition-colors p-0.5" aria-label={`${title} website`} target="_blank" rel="noopener noreferrer"><Globe className="w-4 h-4" /></a>)}
                    </div>
                </div>
                <p className="text-xs text-zinc-500 mt-1">{stack}</p>
                <p className="text-sm text-zinc-300 leading-relaxed mt-2">{blurb}</p>
            </article>
        ))}
    </div>
);

export default Projects;