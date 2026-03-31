import { useMemo } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { servicesMenu } from '../data/servicesData';

const STATIC_PAGES = [
  { id: 'home', title: 'Home', to: '/', hint: 'Homepage', keywords: 'home start landing' },
  { id: 'about', title: 'About Us', to: '/about', hint: 'Company & team', keywords: 'about story team' },
  { id: 'portfolio', title: 'Portfolio', to: '/portfolio', hint: 'Our work', keywords: 'projects case studies' },
  { id: 'blog', title: 'Blog', to: '/blog', hint: 'Articles', keywords: 'news articles insights' },
  { id: 'contact', title: 'Contact', to: '/contact', hint: 'Get in touch', keywords: 'email message quote' },
  { id: 'tech', title: 'Technologies we use', to: '/#tech-stack', hint: 'Our stack', keywords: 'react typescript vite tools' },
  { id: 'offices', title: 'Our offices', to: '/contact#offices', hint: 'London · Dubai · Lahore', keywords: 'address location dubai lahore uk' },
];

const STATIC_IDS = new Set(STATIC_PAGES.map((s) => s.id));

export function useSearchCatalog() {
  const { blogPosts, services, portfolio } = useSiteData();

  return useMemo(() => {
    const serviceSource =
      Array.isArray(services) && services.length > 0 ? services : servicesMenu;
    const svc = serviceSource.map((s) => ({
      id: `svc-${s.id}`,
      title: s.title,
      to: s.path || `/services/${s.id}`,
      hint: 'Service',
      keywords: `${s.title} ${(s.items || []).map((x) => x.title).join(' ')}`,
    }));

    const blogs = (blogPosts || []).map((b) => ({
      id: `blog-${b.id}`,
      title: b.title,
      to: `/blog/${b.id}`,
      hint: b.category || 'Blog',
      keywords: `${b.title} ${b.excerpt || ''} ${b.category || ''}`,
    }));

    const projects = (portfolio || []).map((p) => ({
      id: `port-${p.id}`,
      title: p.name,
      to: `/portfolio/${p.id}`,
      hint: p.type || 'Project',
      keywords: `${p.name} ${p.tech || ''} ${p.description || ''}`,
    }));

    return [...STATIC_PAGES, ...svc, ...blogs, ...projects];
  }, [blogPosts, services, portfolio]);
}

export function filterSearchCatalog(items, query, limit = 12) {
  const q = query.trim().toLowerCase();
  if (!q) {
    return items.filter(
      (i) =>
        STATIC_IDS.has(i.id) ||
        (typeof i.id === 'string' && i.id.startsWith('svc-')),
    );
  }

  return items
    .map((i) => {
      const t = i.title.toLowerCase();
      const k = (i.keywords || '').toLowerCase();
      const h = (i.hint || '').toLowerCase();
      let score = 0;
      if (t.startsWith(q)) score += 5;
      else if (t.includes(q)) score += 3;
      if (k.includes(q)) score += 2;
      if (h.includes(q)) score += 1;
      return { i, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.i);
}
