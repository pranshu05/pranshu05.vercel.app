import Link from 'next/link';
import Image from 'next/image';

interface BlogPostItemProps {
    slug: string;
    title: string;
    date: string;
    viewCount: number;
    img: string;
}

const BlogPostItem: React.FC<BlogPostItemProps> = ({ slug, title, date, viewCount, img }) => (
    <li className='my-2'>
        <Link href={`/posts/${slug}`} passHref className='flex flex-col border border-zinc-400 rounded-md p-4'>
            <Image src={`${img}`} alt={title} width={1080} height={1080} className='w-full rounded-md' />
            <div className='w-full flex flex-col mt-2'>
                <span className='text-lg'>{title}</span>
                <span className='text-zinc-400 text-sm'>{date} • {viewCount} views</span>
            </div>
        </Link>
    </li>
);

export default BlogPostItem;