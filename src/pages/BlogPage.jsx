import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';

const categoryGradients = {
  'Web Development': 'linear-gradient(135deg, rgba(1, 98, 162, 0.35) 0%, rgba(35, 128, 196, 0.2) 50%, rgba(238, 119, 35, 0.15) 100%)',
  'Mobile': 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(6, 182, 212, 0.2) 100%)',
  'Design': 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.2) 100%)',
  'DevOps': 'linear-gradient(135deg, rgba(238, 119, 35, 0.3) 0%, rgba(245, 158, 11, 0.2) 100%)',
  'Backend': 'linear-gradient(135deg, rgba(1, 98, 162, 0.3) 0%, rgba(30, 58, 138, 0.25) 100%)',
  'Cloud': 'linear-gradient(135deg, rgba(14, 165, 233, 0.3) 0%, rgba(1, 98, 162, 0.2) 100%)',
};

export default function BlogPage() {
  const { blogPosts = [] } = useSiteData();
  return (
    <main className="blog-page">
      <section className="blog-hero">
        <div className="blog-hero__glow" />
        <div className="blog-hero__content">
          <motion.span
            className="blog-hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Insights & Updates
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Thoughts on development, design, and digital innovation.
          </motion.p>
        </div>
      </section>

      <section className="blog-posts">
        <div className="blog-posts__inner">
          <div className="blog-grid">
            {(blogPosts || []).map((post, i) => (
              <motion.article
                key={post.id}
                className={`blog-card ${i === 0 ? 'blog-card--featured' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link to={`/blog/${post.id}`} className="blog-card__link">
                  <div
                    className="blog-card__image"
                    style={{ background: categoryGradients[post.category] || categoryGradients['Web Development'] }}
                  >
                    <span className="blog-card__category">{post.category}</span>
                    <div className="blog-card__image-pattern" />
                  </div>
                  <div className="blog-card__content">
                    <time className="blog-card__date">{post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</time>
                    <h2 className="blog-card__title">{post.title}</h2>
                    <p className="blog-card__excerpt">{post.excerpt}</p>
                    <span className="blog-card__read">Read more</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
