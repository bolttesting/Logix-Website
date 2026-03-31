/** Icon keys that exist in `Icons.jsx` and are suitable for social / external links */
export const SOCIAL_ICON_OPTIONS = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'twitter', label: 'Twitter / X' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'globe', label: 'Website / generic' },
  { value: 'share', label: 'Share / link' },
  { value: 'megaphone', label: 'Marketing' },
  { value: 'users', label: 'Community' },
  { value: 'design', label: 'Design / creative' },
  { value: 'email', label: 'Email style' },
];

const ALLOWED_ICONS = new Set(SOCIAL_ICON_OPTIONS.map((o) => o.value));

export const DEFAULT_FOOTER_SOCIAL_LINKS = [
  { id: 'default-linkedin', name: 'LinkedIn', url: 'https://www.linkedin.com/', icon: 'linkedin' },
  { id: 'default-twitter', name: 'Twitter', url: 'https://twitter.com/', icon: 'twitter' },
  { id: 'default-instagram', name: 'Instagram', url: 'https://www.instagram.com/', icon: 'instagram' },
];

export function genSocialLinkId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `s-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function normalizeUrl(url) {
  const t = String(url || '').trim();
  if (!t) return '';
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

/**
 * Public site: links for footer & contact.
 * @param {unknown} raw - site_settings.social_links
 * @returns {{ id: string, name: string, url: string, icon: string }[]}
 */
export function parseFooterSocialLinks(raw) {
  if (raw == null || raw === '') {
    return [...DEFAULT_FOOTER_SOCIAL_LINKS];
  }
  if (typeof raw === 'object' && !Array.isArray(raw) && Object.keys(raw).length === 0) {
    return [...DEFAULT_FOOTER_SOCIAL_LINKS];
  }

  let list = [];
  if (Array.isArray(raw)) {
    list = raw;
  } else if (raw && typeof raw === 'object' && Array.isArray(raw.links)) {
    list = raw.links;
  } else {
    return [...DEFAULT_FOOTER_SOCIAL_LINKS];
  }

  if (list.length === 0) {
    return [];
  }

  const out = list
    .map((row) => {
      if (!row || typeof row !== 'object') return null;
      const url = normalizeUrl(row.url ?? row.href ?? '');
      const name = String(row.name ?? row.label ?? 'Social').trim() || 'Social';
      const icon = ALLOWED_ICONS.has(row.icon) ? row.icon : 'globe';
      const id = String(row.id || '').trim() || genSocialLinkId();
      if (!url) return null;
      return { id, name, url, icon };
    })
    .filter(Boolean);

  return out.length ? out : [];
}

/** Admin form rows: unset / empty object → starter defaults; saved `[]` → empty list. */
export function socialLinksForForm(raw) {
  if (raw == null || raw === '') {
    return DEFAULT_FOOTER_SOCIAL_LINKS.map((x) => ({ ...x }));
  }
  if (typeof raw === 'object' && !Array.isArray(raw) && Object.keys(raw).length === 0) {
    return DEFAULT_FOOTER_SOCIAL_LINKS.map((x) => ({ ...x }));
  }

  let list = [];
  if (Array.isArray(raw)) {
    list = raw;
  } else if (raw && typeof raw === 'object' && Array.isArray(raw.links)) {
    list = raw.links;
  } else {
    return DEFAULT_FOOTER_SOCIAL_LINKS.map((x) => ({ ...x }));
  }

  if (list.length === 0) {
    return [];
  }

  return list
    .map((row) => {
      if (!row || typeof row !== 'object') return null;
      const url = String(row.url ?? row.href ?? '').trim();
      const name = String(row.name ?? row.label ?? '').trim();
      const icon = ALLOWED_ICONS.has(row.icon) ? row.icon : 'globe';
      const id = String(row.id || '').trim() || genSocialLinkId();
      return { id, name: name || 'Link', url, icon };
    })
    .filter(Boolean);
}

export function normalizeSocialLinkForSave(row) {
  const url = normalizeUrl(row.url);
  const name = String(row.name || '').trim() || 'Social';
  const icon = ALLOWED_ICONS.has(row.icon) ? row.icon : 'globe';
  const id = String(row.id || '').trim() || genSocialLinkId();
  return { id, name, url, icon };
}
