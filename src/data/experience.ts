export type ExperienceEntry = {
    company: string;
    period: string;
    title: string;
    paragraphs: string[];
};

export const experiences: ExperienceEntry[] = [
    {
        company: "Fleetway",
        period: "Apr 2026 – Present · Remote",
        title: "Backend Software Engineer",
        paragraphs: [
            "Kotlin and Spring Boot 3 on Fleetcore: logistics REST APIs, OpenAPI, Spring Security with OAuth 2.0 JWT and RBAC, JPA on PostgreSQL. Route search on PostGIS and pgRouting; lifecycle state machines for trips, booking proposals, and billing; integrations with telematics, FX, object storage, and caching.",
        ],
    },
    {
        company: "Roommit",
        period: "Feb 2025 – May 2025 · Remote",
        title: "Software Engineer Intern",
        paragraphs: [
            "Django backend: 40+ REST APIs with JWT, WebSockets and Django Channels for matching and chat. PostgreSQL and Redis for OTP and match data; roughly 80% lower latency on hot paths after tuning and caching.",
            "Next.js, TypeScript, and Redux Toolkit on the client for onboarding, discovery, and messaging.",
        ],
    },
    {
        company: "Google Developer Groups on Campus, DAU",
        period: "Oct 2024 – Present · Gandhinagar",
        title: "Core Member & Convener",
        paragraphs: [
            "Workshops and build sessions for 200+ student developers; coordination with faculty and industry for content and networking.",
        ],
    },
];