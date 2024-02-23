import BlogPostItem from '@/components/(posts)/BlogPostItem';

interface BlogPostListProps {
    posts: { slug: string; frontmatter: { title: string; date: string; readTime: number } }[];
    viewCounts: { [key: string]: number };
}

const BlogPostList: React.FC<BlogPostListProps> = ({ posts, viewCounts }) => (
    <ul className='w-full p-2 break-words whitespace-normal'>
        {posts.map(({ slug, frontmatter }) => (
            <BlogPostItem key={slug} slug={slug} title={frontmatter.title} date={frontmatter.date} viewCount={viewCounts[slug]} />
        ))}
    </ul>
);

export default BlogPostList;