import Link from 'next/link';

interface BlogPostItemProps {
    slug: string;
    title: string;
    date: string;
    viewCount: number;
}

const BlogPostItem: React.FC<BlogPostItemProps> = ({ slug, title, date, viewCount }) => (
    <li className='my-2'>
        <Link href={`/posts/${slug}`} passHref>
            <div className='w-full flex justify-between items-baseline font-lg link'>
                {title}
                <span className='text-zinc-400 text-sm'>{date} • {viewCount} views</span>
            </div>
        </Link>
    </li>
);

export default BlogPostItem;