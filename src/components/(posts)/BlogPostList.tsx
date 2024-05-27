import BlogPostItem from './BlogPostItem';

interface BlogPostListProps {
    posts: { slug: string; frontmatter: { title: string; date: string; } }[];
}

const BlogPostList: React.FC<BlogPostListProps> = ({ posts }) => (
    <div className='w-full'>
        {posts.map(({ slug, frontmatter }) => (
            <BlogPostItem key={slug} slug={slug} title={frontmatter.title} date={frontmatter.date} />
        ))}
    </div>
);

export default BlogPostList;