/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useState } from 'react';

interface BlogPostItemProps {
    slug: string;
    title: string;
    date: string;
    viewCount: number;
    img: string;
}

const BlogPostItem: React.FC<BlogPostItemProps> = ({ slug, title, date, viewCount, img }) => {
    const [isLoading, setLoading] = useState(true);

    return (
        <li className='my-2'>
            <Link href={`/posts/${slug}`} passHref className='flex flex-col border border-zinc-400 rounded-md p-4'>
                <img src={`${img}`} alt={title} width={1080} height={1080} className={`w-full rounded-md grayscale transition-all duration-500 ease-in-out transform hover:grayscale-0 ${isLoading ? "blur-2xl" : "blur-0"}`} onLoad={() => setLoading(false)} />
                <div className='w-full flex flex-col mt-2'>
                    <span className='text-lg'>{title}</span>
                    <span className='text-zinc-400 text-sm'>{date} • {viewCount} views</span>
                </div>
            </Link>
        </li>
    )
};

export default BlogPostItem;