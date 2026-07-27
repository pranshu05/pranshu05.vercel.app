export type ExperienceEntry = {
    company: string;
    period: string;
    title: string;
    paragraphs: string[];
};

export const experiences: ExperienceEntry[] = [
    {
        company: "Fleetway",
        period: "Apr 2026 – Jul 2026 · Remote",
        title: "Backend Software Engineer Intern",
        paragraphs: [
            "Built out a multi-tenant logistics backend in Kotlin/Spring Boot 3 — 55 controllers, 369 REST endpoints, and 390 use-case actions spanning trips, bookings, fuel, finance, and telematics. Stack was PostgreSQL, MapStruct, and JWT with hierarchical RBAC; Caffeine permission caching (15-min TTL, 10k users) kept auth snappy across 300+ guarded endpoints.",
            "Shipped in-database k-shortest path routing with PostGIS + pgRouting on a proprietary road graph (via-points, ranked paths, no external maps APIs). Also ran a geofence telematics pipeline syncing GPS every 2 minutes — PostGIS polygon checks for stop entry/exit/dwell and border crossings, which cut reverse-geocoding cost and latency.",
            "Owned policy-driven state machines for core ops: a 14-status trip lifecycle plus booking-proposal and invoice transitions, with certificate gates and immutability on terminal states. Wrote a greedy fuel-refuel optimiser that simulates consumption along routes and auto-allocates multi-leg purchase orders under tank and reserve constraints.",
        ],
    },
    {
        company: "Roommit",
        period: "Feb 2025 – May 2025 · Remote",
        title: "Software Engineer Intern",
        paragraphs: [
            "Backend for a roommate matching platform in Django/PostgreSQL: 40+ JWT-secured REST APIs for auth, onboarding, discovery, swipe/match, and chat, with real-time messaging over Django Channels and WebSockets. Discovery scored compatibility on location radius, budget, sharing type, 7 lifestyle habit dimensions, and 10 psych ratings — mutual likes became matches.",
            "Built onboarding, discovery, and messaging UX in Next.js, TypeScript, and Redux Toolkit, wiring client state to JWT auth and live WebSocket chat. Cut match and OTP latency by ~80% with composite indexes, SQL tuning, and Redis caching for OTP verification and hot match reads.",
        ],
    },
    {
        company: "Google Developer Groups on Campus, DAU",
        period: "Oct 2024 – Apr 2026 · Gandhinagar",
        title: "Core Member & Convener",
        paragraphs: [
            "Ran hands-on coding workshops and build sessions for the campus developer crowd, and coordinated technical initiatives and networking that reached 1000+ students.",
        ],
    },
];
