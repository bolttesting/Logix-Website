/** Public URL path for a blog post (pretty slug when set, otherwise UUID id). */
export function getBlogPostPath(post) {
  if (!post) return '/blog';
  const s = typeof post.slug === 'string' ? post.slug.trim() : '';
  if (s) return `/blog/${encodeURIComponent(s)}`;
  return `/blog/${post.id}`;
}

/** Match route param to a post from the list (by id or slug). */
export function findBlogPostByRouteParam(posts, routeParam) {
  if (!routeParam || !Array.isArray(posts)) return undefined;
  const raw = String(routeParam);
  const decoded = (() => {
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  })();
  return posts.find((p) => {
    if (String(p.id) === raw || String(p.id) === decoded) return true;
    const sl = typeof p.slug === 'string' ? p.slug.trim() : '';
    return Boolean(sl && (sl === raw || sl === decoded));
  });
}
