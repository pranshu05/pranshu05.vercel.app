import Link from 'next/link';

interface BlogPostItemProps {
    slug: string;
    title: string;
    date: string;
    viewCount: number | null;
}

const BlogPostItem: React.FC<BlogPostItemProps> = ({ slug, title, date, viewCount }) => (
    <Link href={`/posts/${slug}`} passHref className='my-2'>
        <div className='flex items-baseline gap-1'>
            <span className='text-base md:text-xl font-semibold link'>{title}</span>
            <span className='text-zinc-400 text-sm hidden md:inline'>{date} | {viewCount} Views</span>
        </div>
    </Link>
)

export default BlogPostItem;