import { experiences } from "@/data/experience";

const Experience: React.FC = () => (
    <div className="w-full mt-3 mb-0 flex flex-col divide-y divide-zinc-800 text-sm">
        {experiences.map(({ company, period, title, paragraphs }) => (
            <article key={company} className="py-5 first:pt-0 last:pb-0">
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <p className="font-medium text-zinc-100">{company}</p>
                    <p className="text-zinc-500 shrink-0 tabular-nums">{period}</p>
                </div>
                <p className="text-zinc-400 mt-0.5">{title}</p>
                {paragraphs.map((body, i) => (
                    <p key={`${company}-${i}`} className="text-zinc-300 leading-relaxed mt-2">{body}</p>
                ))}
            </article>
        ))}
    </div>
);

export default Experience;