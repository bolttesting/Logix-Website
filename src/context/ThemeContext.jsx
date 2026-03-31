import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

const STORAGE_KEY = 'logix-theme';

const ThemeContext = createContext(null);

function normalizePathname(p) {
  if (!p || p === '/') return '/';
  return p.replace(/\/+$/, '') || '/';
}

function readInitialTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* ignore */
  }
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}

export function ThemeProvider({ children }) {
  const { pathname } = useLocation();
  const isAdminLogin = normalizePathname(pathname) === '/admin/login';

  const [theme, setThemeState] = useState(() =>
    typeof window !== 'undefined' ? readInitialTheme() : 'dark',
  );

  /** Admin login uses dark surfaces; forcing light tokens here made text invisible on that page. */
  useEffect(() => {
    const applied = isAdminLogin ? 'dark' : theme;
    document.documentElement.setAttribute('data-theme', applied);
    document.documentElement.style.colorScheme = applied === 'light' ? 'light' : 'dark';
    if (!isAdminLogin) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        /* ignore */
      }
    }
  }, [theme, isAdminLogin]);

  const toggleTheme = () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark'));

  const setTheme = (t) => {
    if (t === 'light' || t === 'dark') setThemeState(t);
  };

  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
