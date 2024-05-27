import RSS from 'rss';
import { Post } from '../pages/posts/index';

export const generateRSSFeed = (posts: Post[]) => {
    const feed = new RSS({
        title: 'Pranshu05 RSS feed',
        description: 'RSS feed of my blog posts.',
        feed_url: 'https://pranshu05.vercel.app/rss.xml',
        site_url: 'https://pranshu05.vercel.app',
        language: 'en',
    });

    posts.forEach(post => {
        feed.item({
            title: post.frontmatter.title,
            url: `https://pranshu05.vercel.app/posts/${post.slug}`,
            date: post.frontmatter.date,
        });
    });

    return feed.xml({ indent: true });
};