import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function Blog({ posts }) {
    return (
        <div className='w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto '>
            <div className='pb-8'>
                <h1 className='text-3xl font-bold'>Blogs</h1>
                <p>Welcome to my blog page! I write some cool stuff here. Feel free to read 😅</p>
            </div>
            <ul className='w-full p-2 break-words whitespace-normal'>
                {posts.map((post) => (
                    <li className='my-2' key={post.slug}>
                        <Link href={`/posts/${post.slug}`} className='w-full flex justify-between items-baseline' passHref>
                            <div className='font-lg link'>
                                {post.frontmatter.title}
                            </div>
                            <div className='text-zinc-400 text-sm'>
                                {post.frontmatter.date}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getStaticProps() {
    const postsDirectory = path.join(process.cwd(), 'src', 'posts');
    const fileNames = fs.readdirSync(postsDirectory);

    const posts = fileNames.map((fileName) => {
        const filePath = path.join(postsDirectory, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);

        return {
            slug: fileName.replace(/\.mdx$/, ''),
            frontmatter: data,
        };
    });

    return {
        props: {
            posts,
        },
    };
}
