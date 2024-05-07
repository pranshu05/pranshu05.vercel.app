import Link from 'next/link';

interface BlogPostItemProps {
    slug: string;
    title: string;
    date: string;
    description: string;
    viewCount: number;
    img: string;
}

const BlogPostItem: React.FC<BlogPostItemProps> = ({ slug, title, date, description, viewCount, img }) => (
    <Link href={`/posts/${slug}`} passHref className='border border-[#cba6f7] rounded-lg p-4'>
        <div className='w-full flex flex-col mt-2'>
            <div className='w-full flex justify-between mb-2'>
                <span className='text-[#f2cdcd] text-sm'>{date}</span>
                <span className='text-[#f2cdcd] text-sm'>{viewCount} views</span>
            </div>
            <span className='text-xl font-bold text-[#74c7ec]'>{title}</span>
            <span className='text-[#f38ba8]'>{description}</span>
        </div>
    </Link>
)

export default BlogPostItem;