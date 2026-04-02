import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';
import { useSiteData } from '../context/SiteDataContext';
import Seo from '../components/Seo';
import { DEFAULT_DESCRIPTION, truncateMeta } from '../config/seo';
import { findBlogPostByRouteParam } from '../utils/blogPaths';

function toIsoDate(d) {
  if (!d) return undefined;
  const x = new Date(d);
  return Number.isNaN(x.getTime()) ? undefined : x.toISOString();
}

function formatDateIsoDateOnly(value) {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

const fallbackContent = {
  1: `The React ecosystem continues to evolve. Key topics include component architecture, state management, and server components.`,
  2: `Cross-platform frameworks like Flutter and React Native have matured. We break down the trade-offs.`,
  3: `Design trends: micro-interactions, dark mode, accessibility-first design.`,
  4: `Tips for streamlining your development process: IDE setup, CI/CD, deployment automation.`,
  5: `REST, GraphQL, tRPC—API design considerations and best practices.`,
  6: `Deploying to AWS, Azure, Vercel, Netlify—choose based on your stack.`,
};

function defaultBlogKeywords(category) {
  const c = (category || '').trim();
  return [c, 'UK tech blog', 'web development', 'software', 'Logix Contact'].filter(Boolean).join(', ');
}

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function toRenderableHtml(rawContent) {
  const raw = String(rawContent || '').trim();
  if (!raw) return '<p>Content coming soon.</p>';

  const hasHtml = /<\s*\/?\s*(h[1-6]|p|ul|ol|li|strong|em|a|blockquote|br)\b/i.test(raw);
  if (hasHtml) return raw;

  // Backward-compatible fallback for plain-text posts saved as paragraphs.
  return raw
    .split(/\n{2,}/)
    .map((para) => `<p>${escapeHtml(para).replace(/\n/g, '<br />')}</p>`)
    .join('');
}

export default function BlogPostPage() {
  const { id: routeParam } = useParams();
  const { blogPosts = [] } = useSiteData();
  const post = findBlogPostByRouteParam(blogPosts, routeParam);
  const content = post?.content || post?.excerpt || fallbackContent[routeParam] || 'Content coming soon.';
  const contentHtml = DOMPurify.sanitize(toRenderableHtml(content), {
    ALLOWED_TAGS: ['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'blockquote', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });

  if (!post || post.published === false) {
    return (
      <main className="blog-post-page">
        <Seo
          title="Post not found"
          description="This blog post could not be found. Browse our blog for the latest articles from Logix Contact."
          noindex
        />
        <div className="blog-post__404">
          <h1>Post Not Found</h1>
          <Link to="/blog">Back to Blog</Link>
        </div>
      </main>
    );
  }

  const cover = post.image || post.cover_image || post.coverImage;
  const ogImage = (post.og_image && post.og_image.trim()) || cover;
  const metaDescRaw =
    post.seo_description?.trim() || post.excerpt || String(post.content || '').slice(0, 220);
  const metaDesc = truncateMeta(metaDescRaw) || DEFAULT_DESCRIPTION;
  const metaTitlePart = post.seo_title?.trim() || post.title;
  const keywords = post.seo_keywords?.trim() || defaultBlogKeywords(post.category);

  return (
    <main className="blog-post-page">
      <Seo
        title={metaTitlePart}
        headline={post.title}
        description={metaDesc}
        keywords={keywords}
        type="article"
        articlePublishedTime={toIsoDate(post.date)}
        articleModifiedTime={toIsoDate(post.updated_at || post.updatedAt || post.date)}
        articleAuthor={post.author_name?.trim() || undefined}
        articleSection={post.category?.trim() || undefined}
        image={ogImage}
      />
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
          <time dateTime={formatDateIsoDateOnly(post.date)}>
            {post.date && !Number.isNaN(new Date(post.date).getTime())
              ? new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
              : ''}
          </time>
        </motion.div>
        {cover ? (
          <motion.div
            className="blog-post__cover-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <img className="blog-post__cover" src={cover} alt={post.title} />
          </motion.div>
        ) : null}
        <motion.div
          className="blog-post__content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </main>
  );
}
