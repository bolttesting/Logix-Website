/**
 * UK-focused SEO defaults. Set VITE_SITE_URL in .env to your live origin (e.g. https://www.yourdomain.co.uk).
 */
export const SITE_NAME = 'Logix Contact';
export const SITE_NAME_FULL = 'Logix Contact — UK Web & App Development Agency';

export const DEFAULT_DESCRIPTION =
  'UK-based product studio for web apps, mobile apps, and UI/UX design. Strategy, design, and engineering in one team — serving clients across the United Kingdom and internationally.';

export const DEFAULT_KEYWORDS =
  'web development agency UK, app development UK, UI UX design agency, digital product studio, software development United Kingdom, React agency, mobile app developers UK';

/** Canonical site origin (no trailing slash). Falls back to window.location.origin in the browser. */
export function getSiteUrl() {
  const env = import.meta.env.VITE_SITE_URL;
  if (typeof env === 'string' && env.trim()) {
    return env.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'https://logixcontact.co.uk';
}

export const LOCALE = 'en_GB';
export const HTML_LANG = 'en-GB';

/** Trim copy for meta description (recommended ~150–160 characters). */
export function truncateMeta(text, max = 158) {
  if (!text || typeof text !== 'string') return '';
  const t = text.trim().replace(/\s+/g, ' ');
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
}
