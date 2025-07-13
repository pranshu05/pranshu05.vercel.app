import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = { runtime: 'edge', };

export default function handler(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const title = searchParams.get('title') || 'Pranshu05 | Portfolio';
        const description = searchParams.get('description') || 'Full Stack Developer';

        return new ImageResponse(
            (
                <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a0a0a', backgroundImage: 'radial-gradient(circle at 25px 25px, #27272a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #27272a 2%, transparent 0%)', backgroundSize: '100px 100px', }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', maxWidth: '800px', textAlign: 'center', }}>
                        <h1 style={{ fontSize: '60px', fontWeight: 'bold', color: '#f4f4f5', marginBottom: '20px', lineHeight: '1.1', }}>{title}</h1>
                        <p style={{ fontSize: '24px', color: '#a1a1aa', marginBottom: '40px', }}>{description}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: '#71717a', fontSize: '18px', }}><span>pranshu05.vercel.app</span><span>•</span><span>@pranshu_05</span></div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch {
        return new Response(`Failed to generate the image`, { status: 500, });
    }
}