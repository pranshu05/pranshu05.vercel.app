import RSS from 'rss';
import { Post } from '../pages/posts/index';

export const generateRSSFeed = (posts: Post[]) => {
    const feed = new RSS({
        title: 'Pranshu05 - Full Stack Developer Blog',
        description: 'Technical blog posts about web development, programming, and technology by Pranshu Patel. Covering React, Next.js, TypeScript, and more.',
        feed_url: 'https://pranshu05.vercel.app/rss.xml',
        site_url: 'https://pranshu05.vercel.app',
        language: 'en',
        pubDate: new Date(),
        ttl: 60,
        custom_namespaces: {
            'content': 'http://purl.org/rss/1.0/modules/content/',
            'atom': 'http://www.w3.org/2005/Atom'
        },
        custom_elements: [
            {
                'atom:link': {
                    _attr: {
                        href: 'https://pranshu05.vercel.app/rss.xml',
                        rel: 'self',
                        type: 'application/rss+xml'
                    }
                }
            }
        ]
    });

    posts.forEach(post => {
        let description = post.frontmatter.description || '';
        feed.item({
            title: post.frontmatter.title,
            description: description,
            url: `https://pranshu05.vercel.app/posts/${post.slug}`,
            guid: `https://pranshu05.vercel.app/posts/${post.slug}`,
            categories: ['Technology', 'Programming', 'Web Development'],
            author: 'Pranshu Patel',
            date: new Date(post.frontmatter.date),
        });
    });

    return feed.xml({ indent: true });
};