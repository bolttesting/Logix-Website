import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Seo from '../../components/Seo';
import './Admin.css';

export default function AdminLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!supabase) {
      navigate('/admin/login', { replace: true });
      setLoading(false);
      return;
    }
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
        if (!session) navigate('/admin/login', { replace: true });
      })
      .catch((err) => {
        console.error('Auth check failed:', err);
        setLoading(false);
        navigate('/admin/login', { replace: true });
      });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      if (!session) navigate('/admin/login', { replace: true });
    });
    return () => subscription?.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase?.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="admin-login">
        <Seo title="Admin" description="Logix Contact admin area." noindex />
        <div className="admin-login__card">Loading...</div>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="admin-login">
        <Seo title="Admin" description="Logix Contact admin area." noindex />
        <div className="admin-login__card">Redirecting to login...</div>
      </div>
    );
  }

  const navItems = [
    { to: '/admin', end: true, label: 'Dashboard' },
    { to: '/admin/portfolio', end: false, label: 'Portfolio' },
    { to: '/admin/blog', end: false, label: 'Blog' },
    { to: '/admin/team', end: false, label: 'Team' },
    { to: '/admin/testimonials', end: false, label: 'Testimonials' },
    { to: '/admin/services', end: false, label: 'Services' },
    { to: '/admin/settings', end: false, label: 'Settings' },
    { to: '/admin/contacts', end: false, label: 'Contact Submissions' },
  ];

  return (
    <div className="admin-layout">
      <Seo title="Admin" description="Logix Contact content management dashboard." noindex />
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">Logix<span>Contact</span> Admin</div>
        <nav className="admin-sidebar__nav-wrap" aria-label="Admin sections">
          <ul className="admin-sidebar__nav">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="admin-sidebar__logout">
          <button type="button" onClick={handleLogout} className="admin-btn admin-btn--secondary admin-sidebar__logout-btn">
            Logout
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
