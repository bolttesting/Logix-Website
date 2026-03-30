import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { portfolioProjects, portfolioProjectDetails } from '../data/portfolioData';
import { servicesMenu, servicePageContent } from '../data/servicesData';

// Static fallbacks
const staticTeam = [
  { id: '1', name: 'James Wilson', role: 'CEO & Founder', avatar: 'JW', bio: '' },
  { id: '2', name: 'Maria Kowalski', role: 'CTO & Co-Founder', avatar: 'MK', bio: '' },
  { id: '3', name: 'David Chen', role: 'Engineering Lead', avatar: 'DC', bio: '' },
  { id: '4', name: 'Elena Ortiz', role: 'Head of Design', avatar: 'EO', bio: '' },
  { id: '5', name: 'Sam Okoro', role: 'Senior Full-Stack Developer', avatar: 'SO', bio: '' },
  { id: '6', name: 'Priya Sharma', role: 'Product Manager', avatar: 'PS', bio: '' },
  { id: '7', name: 'Tom Brennan', role: 'DevOps & Infrastructure', avatar: 'TB', bio: '' },
  { id: '8', name: 'Zoe Williams', role: 'Client Success Lead', avatar: 'ZW', bio: '' },
];

const staticTestimonials = [
  { id: '1', name: 'Sarah Johnson', role: 'CEO, TechStart', text: 'Exceptional work from start to finish. They delivered our web app on time and exceeded our expectations. Highly recommend!', avatar: 'SJ' },
  { id: '2', name: 'Michael Chen', role: 'Founder, InnovateLab', text: 'The team understood our vision perfectly. The mobile app they built has transformed our user engagement. Five stars!', avatar: 'MC' },
  { id: '3', name: 'Emma Roberts', role: 'Director, ScaleUp', text: 'Professional, responsive, and results-driven. Our digital presence has grown significantly since working with them.', avatar: 'ER' },
];

const staticBlog = [
  { id: '1', title: 'Building Scalable React Applications in 2025', excerpt: 'Discover the latest patterns and best practices...', category: 'Web Development', date: '2025-03-01' },
  { id: '2', title: 'The Future of Mobile App Development', excerpt: 'Exploring cross-platform frameworks...', category: 'Mobile', date: '2025-02-28' },
  { id: '3', title: 'UI/UX Trends That Define Modern Design', excerpt: 'From micro-interactions to dark mode...', category: 'Design', date: '2025-02-25' },
  { id: '4', title: 'Optimizing Your Development Workflow', excerpt: 'Tips and tools to streamline...', category: 'DevOps', date: '2025-02-22' },
  { id: '5', title: 'Understanding API Design Best Practices', excerpt: 'REST, GraphQL, or tRPC?...', category: 'Backend', date: '2025-02-18' },
  { id: '6', title: 'Getting Started with Cloud Deployment', excerpt: 'Deploy to AWS, Azure, or Vercel...', category: 'Cloud', date: '2025-02-15' },
];

const staticSettings = { email: 'info@logixcontact.com', phone: '+123-456-7890', address: '123 Street, City, Country', hours: 'Mon - Fri: 9AM - 6PM' };

const SiteDataContext = createContext(null);

export function SiteDataProvider({ children }) {
  const [portfolio, setPortfolio] = useState([]);
  const [portfolioDetails, setPortfolioDetails] = useState({});
  const [blogPosts, setBlogPosts] = useState([]);
  const [team, setTeam] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [services, setServices] = useState([]);
  const [settings, setSettings] = useState(staticSettings);
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useSupabase, setUseSupabase] = useState(false);

  const loadFromSupabase = useCallback(async () => {
    if (!supabase) return false;
    try {
      const [portRes, blogRes, teamRes, testRes, settingsRes, subsRes] = await Promise.all([
        supabase.from('portfolio').select('*').order('sort_order'),
        supabase.from('blog_posts').select('*').eq('published', true).order('date', { ascending: false }),
        supabase.from('team_members').select('*').order('sort_order'),
        supabase.from('testimonials').select('*').order('sort_order'),
        supabase.from('site_settings').select('*').single(),
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
      ]);

      if (portRes.data?.length) {
        const projects = portRes.data.map(p => ({ ...p, id: String(p.id) }));
        setPortfolio(projects);
        const details = {};
        projects.forEach(p => { if (p.details && Object.keys(p.details).length) details[p.id] = p.details; });
        setPortfolioDetails(details);
      } else {
        setPortfolio(portfolioProjects.map(p => ({ ...p, id: String(p.id) })));
        setPortfolioDetails(portfolioProjectDetails);
      }
      if (blogRes.data?.length) setBlogPosts(blogRes.data.map(b => ({ ...b, id: String(b.id) })));
      else setBlogPosts(staticBlog);
      if (teamRes.data?.length) setTeam(teamRes.data.map(t => ({ ...t, id: String(t.id) })));
      else setTeam(staticTeam);
      if (testRes.data?.length) setTestimonials(testRes.data.map(t => ({ ...t, id: String(t.id) })));
      else setTestimonials(staticTestimonials);
      if (settingsRes.data) setSettings({ ...staticSettings, ...settingsRes.data });
      if (subsRes.data) setContactSubmissions(subsRes.data);

      const svcRes = await supabase.from('services').select('*').order('sort_order');
      if (svcRes.data?.length) setServices(svcRes.data);
      else setServices(servicesMenu);

      return portRes.data?.length > 0 || blogRes.data?.length > 0 || teamRes.data?.length > 0 || testRes.data?.length > 0;
    } catch (e) {
      console.warn('Supabase load failed:', e);
      return false;
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const hasData = await loadFromSupabase();
      setUseSupabase(hasData);

      if (!hasData) {
        setPortfolio(portfolioProjects.map(p => ({ ...p, id: String(p.id) })));
        setPortfolioDetails(portfolioProjectDetails);
        setBlogPosts(staticBlog);
        setTeam(staticTeam);
        setTestimonials(staticTestimonials);
        setServices(servicesMenu);
      }
      setLoading(false);
    })();
  }, [loadFromSupabase]);

  const value = {
    portfolio,
    portfolioDetails,
    blogPosts,
    team,
    testimonials,
    services,
    servicePageContent: services.length && services[0]?.page_content ? Object.fromEntries(services.map(s => [s.id, s.page_content])) : servicePageContent,
    settings,
    contactSubmissions,
    loading,
    useSupabase,
    isSupabaseConfigured: isSupabaseConfigured(),
    refresh: loadFromSupabase,
  };

  return (
    <SiteDataContext.Provider value={value}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error('useSiteData must be used within SiteDataProvider');
  return ctx;
}
