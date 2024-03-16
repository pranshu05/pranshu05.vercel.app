import BlogPostItem from './BlogPostItem';

interface BlogPostListProps {
    posts: { slug: string; frontmatter: { title: string; date: string; description: string; readTime: number; img: string } }[];
    viewCounts: { [key: string]: number };
}

const BlogPostList: React.FC<BlogPostListProps> = ({ posts, viewCounts }) => (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
        {posts.map(({ slug, frontmatter }) => (
            <BlogPostItem key={slug} slug={slug} title={frontmatter.title} date={frontmatter.date} description={frontmatter.description} viewCount={viewCounts[slug]} img={frontmatter.img} />
        ))}
    </div>
);

export default BlogPostList;