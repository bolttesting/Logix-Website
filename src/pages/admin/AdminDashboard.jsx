import { Link } from 'react-router-dom';
import { useSiteData } from '../../context/SiteDataContext';
import './Admin.css';

const StatIcon = ({ name }) => {
  const icons = {
    portfolio: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    blog: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
    team: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    testimonials: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    contacts: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    settings: 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.622 10.395l-1.097-2.65L20 6l-2-2-1.735 1.483-2.654-1.096-1.098 2.652L12 8l-2.513.839-1.098-2.652-2.654 1.097L4 4 2 6l1.483 1.735-2.65 1.097L2 12l.839 2.513 2.65 1.097L4 20l2-2 1.735 1.483 2.654-1.096 1.097-2.652L12 16l2.513-.839 1.098 2.652 2.654-1.097L20 18l2-2-1.483-1.735 2.65-1.097L22 12l-.839-2.513z',
  };
  return (
    <svg className="admin-stat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d={icons[name] || icons.portfolio} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default function AdminDashboard() {
  const { portfolio, blogPosts, team, testimonials, contactSubmissions, useSupabase, isSupabaseConfigured, refresh } = useSiteData();

  if (!isSupabaseConfigured) {
    return (
      <div className="admin-dashboard">
        <div className="admin-dashboard__welcome admin-dashboard__welcome--setup">
          <h1>Setup Required</h1>
          <p>Configure Supabase to unlock the full admin panel</p>
        </div>
        <div className="admin-card admin-card--elevated">
          <h2 className="admin-card__title">Configure Supabase</h2>
          <ol className="admin-setup-steps">
            <li>Create a free account at <a href="https://supabase.com" target="_blank" rel="noreferrer">supabase.com</a></li>
            <li>Create a new project</li>
            <li>Go to SQL Editor and run the contents of <code>supabase/schema.sql</code></li>
            <li>Create an admin user (Authentication → Users → Add user)</li>
            <li>Copy your project URL and anon key from Settings → API</li>
            <li>Create a <code>.env</code> file with <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code></li>
            <li>Restart the dev server</li>
          </ol>
        </div>
      </div>
    );
  }

  const stats = [
    { key: 'portfolio', count: portfolio?.length || 0, label: 'Portfolio Projects', to: '/admin/portfolio', color: 'orange' },
    { key: 'blog', count: blogPosts?.length || 0, label: 'Blog Posts', to: '/admin/blog', color: 'blue' },
    { key: 'team', count: team?.length || 0, label: 'Team Members', to: '/admin/team', color: 'green' },
    { key: 'testimonials', count: testimonials?.length || 0, label: 'Testimonials', to: '/admin/testimonials', color: 'purple' },
    { key: 'contacts', count: contactSubmissions?.length || 0, label: 'Contact Submissions', to: '/admin/contacts', color: 'teal' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard__welcome">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back. Here&apos;s an overview of your content.</p>
        </div>
        <button onClick={refresh} className="admin-btn admin-btn--secondary admin-btn--icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Refresh
        </button>
      </div>

      {!useSupabase && (
        <div className="admin-banner admin-banner--info">
          <span className="admin-banner__dot" />
          Using static data. Add content via the admin to switch to database.
        </div>
      )}

      <section className="admin-dashboard__section">
        <h2 className="admin-dashboard__section-title">Overview</h2>
        <div className="admin-stats-grid">
          {stats.map(({ key, count, label, to, color }) => (
            <Link key={key} to={to} className={`admin-stat-card admin-stat-card--${color}`}>
              <StatIcon name={key} />
              <div className="admin-stat-card__content">
                <span className="admin-stat-card__value">{count}</span>
                <span className="admin-stat-card__label">{label}</span>
              </div>
              <span className="admin-stat-card__arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="admin-dashboard__section">
        <h2 className="admin-dashboard__section-title">Quick Actions</h2>
        <div className="admin-quick-actions">
          <Link to="/admin/portfolio" className="admin-action-card">
            <StatIcon name="portfolio" />
            <span>Manage Portfolio</span>
          </Link>
          <Link to="/admin/blog" className="admin-action-card">
            <StatIcon name="blog" />
            <span>Manage Blog</span>
          </Link>
          <Link to="/admin/team" className="admin-action-card">
            <StatIcon name="team" />
            <span>Manage Team</span>
          </Link>
          <Link to="/admin/testimonials" className="admin-action-card">
            <StatIcon name="testimonials" />
            <span>Manage Testimonials</span>
          </Link>
          <Link to="/admin/settings" className="admin-action-card admin-action-card--muted">
            <StatIcon name="settings" />
            <span>Site Settings</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
