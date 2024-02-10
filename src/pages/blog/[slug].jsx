import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import SyntaxHighlighter from 'react-syntax-highlighter'

const components = { SyntaxHighlighter }

const BlogPost = ({ frontMatter: { title, date }, mdxSource }) => {
  return (
    <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-2/5 mx-auto mt-32">
      <h1 className='text-2xl font-bold pb-8'>{title}</h1>
      <MDXRemote {...mdxSource} components={components} />
    </div>
  )
}

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
}

const getStaticProps = async ({ params: { slug } }) => {
  const postsDirectory = path.join(process.cwd(), 'src', 'posts');
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const { data: frontMatter, content } = matter(fileContent)
  const mdxSource = await serialize(content)

  return {
    props: {
      frontMatter,
      slug,
      mdxSource
    }
  }
}

export { getStaticProps, getStaticPaths }
export default BlogPost