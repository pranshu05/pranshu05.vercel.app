/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useState } from 'react';

interface BlogPostItemProps {
    slug: string;
    title: string;
    date: string;
    description: string;
    viewCount: number;
    img: string;
}

const BlogPostItem: React.FC<BlogPostItemProps> = ({ slug, title, date, description, viewCount, img }) => {
    const [isLoading, setLoading] = useState(true);

    return (
        <Link href={`/posts/${slug}`} passHref className='flex flex-col border border-zinc-700 rounded-md p-4'>
            <img src={`${img}`} alt={title} className={`w-full rounded-md grayscale transition-all duration-500 ease-in-out transform hover:grayscale-0 ${isLoading ? "blur-2xl" : "blur-0"}`} onLoad={() => setLoading(false)} />
            <div className='w-full flex flex-col mt-2'>
                <div className='w-full flex justify-between mb-2'>
                    <span className='text-zinc-400 text-sm'>{date}</span>
                    <span className='text-zinc-400 text-sm'>{viewCount} views</span>
                </div>
                <span className='text-xl font-bold'>{title}</span>
                <span className='text-zinc-400'>{description}</span>
            </div>
        </Link>
    )
};

export default BlogPostItem;