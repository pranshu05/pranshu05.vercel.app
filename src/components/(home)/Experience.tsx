"use client"
import { useState } from "react";
import { experiences } from "@/data/experience";
import { ChevronUp, ChevronDown } from "lucide-react";

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
                            <div className="flex justify-between w-full">
                                <div className="flex flex-col">
                                    <p className="font-semibold text-base text-zinc-100">{company}</p>
                                    <p className="text-zinc-400 mt-0.5">{title}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className="text-zinc-500 tabular-nums mt-0.5">{period}</p>
                                    {isExpanded ? (
                                        <ChevronUp className="mt-1 h-5 w-5 shrink-0 text-zinc-500" aria-hidden="true" />
                                    ) : (
                                        <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-zinc-500" aria-hidden="true" />
                                    )}
                                </div>
                            </div>
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