import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './CookieNotice.css';

const COOKIE_KEY = 'lc_cookie_consent_v1';

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const existing = window.localStorage.getItem(COOKIE_KEY);
      setVisible(existing !== 'accepted');
    } catch {
      setVisible(true);
    }
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);

  const acceptCookies = () => {
    try {
      window.localStorage.setItem(COOKIE_KEY, 'accepted');
    } catch {
      // Non-blocking: still hide the banner even if storage fails.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="cookie-notice" role="dialog" aria-live="polite" aria-label="Cookie notice">
      <div className="cookie-notice__card">
        <div className="cookie-notice__head">
          <span className="cookie-notice__emoji" aria-hidden>🍪</span>
          <h2>Cookie Notice</h2>
        </div>
        <p className="cookie-notice__text">
          We use essential and analytics cookies to improve your experience, understand website performance,
          and support our services in the UK. By clicking Accept, you agree to our use of cookies.
          {' '}
          <Link to="/legal/cookie-policy">Read cookie policy</Link>.
        </p>
        <div className="cookie-notice__actions">
          <Link className="cookie-notice__prefs" to="/legal/cookie-policy">
            Manage your preferences
          </Link>
          <button type="button" className="cookie-notice__accept" onClick={acceptCookies}>
            Accept
          </button>
        </div>
        <p className="cookie-notice__meta">Logix Contact · {year}</p>
      </div>
    </aside>
  );
}
