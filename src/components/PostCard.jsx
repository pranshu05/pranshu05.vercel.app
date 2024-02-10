export default function PostCard({ post }) {
    return (
        <div>
            <div>
                <h2>{post.frontMatter.title}</h2>
                <p>{post.frontMatter.body}</p>
            </div>
            <div>
                <h2>📅{post.frontMatter.date}</h2>
                <h2>⏰{post.frontMatter.readTime}</h2>
            </div>
        </div >
    )
}