import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import BlogContent from '@/components/(posts)/(slug)/BlogContent'
import PostViewCounter from '@/components/(posts)/(slug)/PostViewCounter'
import TableOfContents from '@/components/(posts)/(slug)/TableOfContents'
import { extractToc } from '@/lib/TocExtractor'

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const postsDirectory = path.join(process.cwd(), 'src', 'posts')
    if (!fs.existsSync(postsDirectory)) return []
    const files = fs.readdirSync(postsDirectory)
    return files
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => ({
            slug: fileName.replace(/\.mdx$/, ''),
        }))
}

async function getPostData(slug: string) {
    const filePath = path.join(process.cwd(), 'src', 'posts', `${slug}.mdx`)
    if (!fs.existsSync(filePath)) return null
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data: frontMatter, content } = matter(fileContent)

    return {
        frontMatter: {
            title: (frontMatter.title as string) || '',
            date: (frontMatter.date as string) || '',
            description: (frontMatter.description as string) || '',
            readTime: (frontMatter.readTime as number) || 5,
            slug,
        },
        content,
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const postData = await getPostData(slug)
    if (!postData) return {}

    const { title, date, description } = postData.frontMatter
    const publishedTime = new Date(date).toISOString()
    const ogImage = `https://pranshu05.vercel.app/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

    return {
        title: `${title} | Pranshu05`,
        description,
        keywords: [title, "Programming", "Web Development", "Technology", "Tutorial", "Pranshu Patel"],
        alternates: {
            canonical: `/posts/${slug}`,
        },
        openGraph: {
            title,
            description,
            type: "article",
            publishedTime,
            modifiedTime: publishedTime,
            url: `https://pranshu05.vercel.app/posts/${slug}`,
            images: [{ url: ogImage }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
        },
    }
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params
    const postData = await getPostData(slug)

    if (!postData) {
        notFound()
    }

    const { frontMatter, content } = postData
    const { title, date, description, readTime } = frontMatter
    const publishedTime = new Date(date).toISOString()
    const ogImage = `https://pranshu05.vercel.app/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`
    const tocItems = extractToc(content)

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": description,
        "image": ogImage,
        "author": {
            "@type": "Person",
            "name": "Pranshu Patel",
            "url": "https://pranshu05.vercel.app",
        },
        "publisher": {
            "@type": "Person",
            "name": "Pranshu Patel",
            "url": "https://pranshu05.vercel.app",
        },
        "datePublished": publishedTime,
        "dateModified": publishedTime,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://pranshu05.vercel.app/posts/${slug}`,
        },
        "wordCount": Math.ceil(readTime * 200),
        "timeRequired": `PT${readTime}M`,
        "articleSection": "Technology",
        "keywords": ["Programming", "Web Development", "Technology", "Tutorial"],
    }

    return (
        <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-3/5 2xl:w-1/2 max-w-3xl mx-auto relative">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <div className="py-28 text-center">
                <PostViewCounter slug={slug} date={date} readTime={readTime} />
                <h1 className="text-5xl font-bold text-zinc-100 mt-4 mb-6">{title}</h1>
                <p className="text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto">{description}</p>
            </div>
            <hr className="mt-8 mb-6 border-zinc-800" />
            <TableOfContents items={tocItems} />
            <BlogContent content={content} />
        </div>
    )
}