import RSS from 'rss';
import { Post } from '../pages/posts/index';

export const generateRSSFeed = (posts: Post[]) => {
    const feed = new RSS({
        title: 'My Blog',
        description: 'Latest posts from my blog',
        feed_url: 'https://pranshu05.vercel.app/rss.xml',
        site_url: 'https://pranshu05.vercel.app',
        language: 'en',
    });

    posts.forEach(post => {
        feed.item({
            title: post.frontmatter.title,
            description: post.frontmatter.description,
            url: `${process.env.BASE_URL}/posts/${post.slug}`,
            date: post.frontmatter.date,
        });
    });

    return feed.xml({ indent: true });
};