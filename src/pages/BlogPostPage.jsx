import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteDataContext';

const fallbackContent = {
  1: `The React ecosystem continues to evolve. Key topics include component architecture, state management, and server components.`,
  2: `Cross-platform frameworks like Flutter and React Native have matured. We break down the trade-offs.`,
  3: `Design trends: micro-interactions, dark mode, accessibility-first design.`,
  4: `Tips for streamlining your development process: IDE setup, CI/CD, deployment automation.`,
  5: `REST, GraphQL, tRPC—API design considerations and best practices.`,
  6: `Deploying to AWS, Azure, Vercel, Netlify—choose based on your stack.`,
};

export default function BlogPostPage() {
  const { id } = useParams();
  const { blogPosts = [] } = useSiteData();
  const post = blogPosts.find((p) => String(p.id) === String(id));
  const content = post?.content || post?.excerpt || fallbackContent[id] || 'Content coming soon.';

  if (!post) {
    return (
      <main className="blog-post-page">
        <div className="blog-post__404">
          <h1>Post Not Found</h1>
          <Link to="/blog">Back to Blog</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="blog-post-page">
      <article className="blog-post">
        <motion.div
          className="blog-post__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/blog" className="blog-post__back">← Back to Blog</Link>
          <span className="blog-post__category">{post.category}</span>
          <h1>{post.title}</h1>
          <time>{post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</time>
        </motion.div>
        <motion.div
          className="blog-post__content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {String(content).split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </motion.div>
      </article>
    </main>
  );
}
