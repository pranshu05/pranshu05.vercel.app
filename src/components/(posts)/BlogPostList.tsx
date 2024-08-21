import { useEffect, useState } from 'react';
import BlogPostItem from './BlogPostItem';
import { getViewCount } from '../../lib/ViewsData';

interface BlogPostListProps {
    posts: { slug: string; frontmatter: { title: string; date: string; } }[];
}

const BlogPostList: React.FC<BlogPostListProps> = ({ posts }) => {
    const [viewCounts, setViewCounts] = useState<{ [slug: string]: number | null }>({});

    useEffect(() => {
        const fetchViewCounts = async () => {
            const counts: { [slug: string]: number | null } = {};
            for (const post of posts) {
                try {
                    counts[post.slug] = await getViewCount(post.slug);
                } catch (error) {
                    console.error(`Error getting view count for ${post.slug}:`, error);
                    counts[post.slug] = null;
                }
            }
            setViewCounts(counts);
        };
        fetchViewCounts();
    }, [posts]);

    return (
        <div className='w-full'>
            {posts.map(({ slug, frontmatter }) => (
                <BlogPostItem key={slug} slug={slug} title={frontmatter.title} date={frontmatter.date} viewCount={viewCounts[slug] || 0} />
            ))}
        </div>
    );
};

export default BlogPostList;