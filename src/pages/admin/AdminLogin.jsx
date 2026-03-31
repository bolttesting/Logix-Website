import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Seo from '../../components/Seo';
import './Admin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    setError('');
    setLoading(true);
    try {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) throw err;
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (!supabase) {
    return (
      <div className="admin-login">
        <Seo title="Admin login" description="Administrator sign-in for Logix Contact." noindex />
        <div className="admin-login__card">
          <h1>Admin Setup Required</h1>
          <p>Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code> file.</p>
          <p>See <code>.env.example</code> for reference.</p>
          <a href="/">← Back to Site</a>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login">
      <Seo title="Admin login" description="Sign in to the Logix Contact admin dashboard." noindex />
      <div className="admin-login__card">
        <h1>Admin Login</h1>
        <p className="admin-login__subtitle">Logix Contact Dashboard</p>
        <form onSubmit={handleSubmit}>
          <div className="admin-form__field">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@example.com" />
          </div>
          <div className="admin-form__field">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="admin-login__error">{error}</p>}
          <button type="submit" className="admin-btn admin-btn--primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <a href="/" className="admin-login__back">← Back to Site</a>
      </div>
    </div>
  );
}
