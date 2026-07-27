import { useState } from "react";
import { experiences } from "@/data/experience";

const Experience: React.FC = () => {
    const [expandedItem, setExpandedItem] = useState<string | null>(null);

    return (
        <div className="w-full mt-3 mb-0 flex flex-col divide-y divide-zinc-800 text-sm">
            {experiences.map(({ company, period, title, paragraphs }) => {
                const itemId = `${company}-${title}`;
                const isExpanded = expandedItem === itemId;

                return (
                    <article key={itemId} className="py-5 first:pt-0 last:pb-0">
                        <button type="button" onClick={() => setExpandedItem(isExpanded ? null : itemId)} className="w-full text-left flex items-start justify-between gap-4" aria-expanded={isExpanded}>
                            <div className="min-w-0">
                                <p className="font-semibold text-base text-zinc-100">{title}</p>
                                <p className="text-zinc-400 mt-0.5">{company}</p>
                                <p className="text-zinc-500 tabular-nums mt-0.5">{period}</p>
                            </div>
                            <svg className={`mt-1 h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.114l3.71-3.885a.75.75 0 111.08 1.04l-4.25 4.45a.75.75 0 01-1.08 0l-4.25-4.45a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {isExpanded && (
                            <p className="text-zinc-300 leading-relaxed mt-3">{paragraphs.join(" ")}</p>
                        )}
                    </article>
                );
            })}
        </div>
    );
};

export default Experience;