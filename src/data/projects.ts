export type ProjectEntry = {
    title: string;
    blurb: string;
    stack: string;
    github?: string;
    website?: string;
};

export const projects: ProjectEntry[] = [
    {
        title: "DBSync",
        blurb: "PostgreSQL schema drift analyzer: versioned snapshots from system catalogs, structural diffs (tables, constraints, indexes, RLS, …), forward-only DDL planner with preview and optional single-transaction apply, React Flow ER view of foreign keys.",
        stack: "TypeScript · Next.js · PostgreSQL · React Flow",
        website: "https://dbsynx.vercel.app",
    },
    {
        title: "Song2Vec",
        blurb: "Audio similarity with librosa features, z-normalized DTW and cross-correlation for tempo-robust scores; Flask API with similarity and alignment; Plotly and Tailwind UI.",
        stack: "Python · Flask · NumPy · librosa",
        github: "https://github.com/pranshu05/song2vec",
    },
    {
        title: "next-api-analyzer",
        blurb: "npm CLI: AST-based scan of Next.js route handlers, 15+ CWE-style checks, SARIF for GitHub Actions and GitLab CI, profiling (~150ms per project), 30-day scan history with incremental reruns (~50% faster on tracked repos).",
        stack: "TypeScript · AST · Next.js · CI/CD · SARIF",
        github: "https://github.com/pranshu05/next-api-analyzer",
        website: "https://www.npmjs.com/package/next-api-analyzer",
    },
    {
        title: "TuneStats",
        blurb: "Full-stack Spotify listening analytics: 50+ metrics, normalized PostgreSQL (3NF) with indexing, cron ingestion, SWR on the client, friend-based stat comparison.",
        stack: "TypeScript · Next.js · Tailwind CSS · PostgreSQL · Spotify Web API",
        github: "https://github.com/pranshu05/tunestats",
    },
    {
        title: "MusicZodiac",
        blurb: "Astrology-themed music app: Next.js, Last.fm, and AI-generated personalized listening charts.",
        stack: "Next.js · Last.fm API · OpenAI API",
        github: "https://github.com/pranshu05/musiczodiac",
        website: "https://music-zodiac.vercel.app",
    },
    {
        title: "AcadVault2.0",
        blurb: "Open-source collaborative academic resources for the DAU community.",
        stack: "Next.js · Tailwind CSS · MongoDB",
        github: "https://github.com/AcadVault/AcadVault2.0",
        website: "https://acadvault.vercel.app",
    },
    {
        title: "Elpha",
        blurb: "Verified multi-purpose Discord bot: 150,000+ users, 150+ servers, moderation and utilities with disciplined releases.",
        stack: "Node.js · MongoDB · Discord.js",
        github: "https://github.com/pranshu05/Elpha",
        website: "https://elphabot.github.io",
    },
];