import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import rehypePrism from 'rehype-prism';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import langPython from 'highlight.js/lib/languages/python';
import langRust from 'highlight.js/lib/languages/rust';
import langCPP from 'highlight.js/lib/languages/cpp';

import 'prism-themes/themes/prism-material-dark.css';

export const langauges = {
  python: langPython,
  rust: langRust,
  cpp: langCPP,
}

const components = {};

const BlogPost = ({ frontMatter: { title, date, readTime }, mdxSource }) => {
  return (
    <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto mt-32">
      <div className='pb-8'>
        <h1 className='text-3xl font-bold'>{title}</h1>
        <div className='text-zinc-400 flex items-baseline text-base'>
          📅 {date} • ⏰ {readTime} minutes
        </div>
      </div>
      <div className='post break-words w-full p-0 m-0'>
        <MDXRemote {...mdxSource} components={components} />
      </div>
      <style jsx global>{``}</style>
    </div>
  );
};

const getStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), 'src', 'posts');
  const fileNames = fs.readdirSync(postsDirectory);

  const paths = fileNames.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.mdx$/, ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

const getStaticProps = async ({ params: { slug } }) => {
  const postsDirectory = path.join(process.cwd(), 'src', 'posts');
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const { data: frontMatter, content } = matter(fileContent);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        [rehypePrism, {
          ignoreMissing: true,
          langauges,
          aliases: {}
        }],
      ],
    },
  });

  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
    },
  };
};

export { getStaticProps, getStaticPaths };
export default BlogPost;