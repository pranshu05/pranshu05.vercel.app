import Link from 'next/link';

interface BlogPostItemProps {
    slug: string;
    title: string;
    date: string;
}

const BlogPostItem: React.FC<BlogPostItemProps> = ({ slug, title, date }) => (
    <Link href={`/posts/${slug}`} passHref className='my-2'>
        <div className='w-full flex items-baseline gap-1'>
            <span className='text-xl font-bold'>{title}</span>
            <span className='text-zinc-400 text-sm'>{date}</span>
        </div>
    </Link>
)

export default BlogPostItem;